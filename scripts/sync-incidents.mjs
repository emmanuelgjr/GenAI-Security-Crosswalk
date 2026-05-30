#!/usr/bin/env node
/**
 * sync-incidents.mjs — Pull the incident set from the upstream source of truth
 * (the genai_incidents repo) and emit it in the crosswalk's incident schema.
 *
 * The crosswalk's `data/incidents.json` is a GENERATED VIEW of genai_incidents —
 * do not hand-edit it. Curate incidents upstream; this script (run weekly by the
 * Weekly Source Watch workflow) pulls them through. `node scripts/generate.js`
 * then regenerates data/entries + docs/incidents.js from the result.
 *
 * Usage:
 *   node scripts/sync-incidents.mjs                 # fetch upstream main, tier=curated
 *   node scripts/sync-incidents.mjs --tier reviewed # wider slice
 *   node scripts/sync-incidents.mjs --ref v2.0.0    # pin to an upstream tag
 *   node scripts/sync-incidents.mjs --from file.json # read a local upstream copy
 *
 * Field mapping (genai_incidents → crosswalk):
 *   owasp_llm + owasp_asi + owasp_dsgai  → owasp_entries (deduped)
 *   maestro_layers / mitigations / references / impact / affected / category / tags → passthrough
 *   id kept verbatim (upstream is the ID authority).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const UPSTREAM_REPO = 'emmanuelgjr/genai_incidents';
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : def;
};
const TIER = getArg('--tier', 'curated');
const REF = getArg('--ref', 'main');
const FROM = getArg('--from', null);
const UPSTREAM_URL = `https://raw.githubusercontent.com/${UPSTREAM_REPO}/${REF}/data/incidents.json`;

// crosswalk Incident schema fields, in emit order. Optional fields are omitted
// when upstream has no value (so the generated file stays clean).
const SEVERITIES = new Set(['Critical', 'High', 'Medium', 'Low']);

function mapIncident(u) {
  const owasp = [
    ...(u.owasp_llm || []),
    ...(u.owasp_asi || []),
    ...(u.owasp_dsgai || []),
  ];
  const owasp_entries = [...new Set(owasp)];

  // References: prefer the structured array; fall back to primary_reference.
  let references = Array.isArray(u.references) && u.references.length
    ? u.references.filter(r => r && r.url)
    : [];
  if (!references.length && u.primary_reference) {
    references = [{ title: u.title, url: u.primary_reference, type: 'news' }];
  }

  const out = {
    id: u.id,
    title: u.title,
    date: u.date,
  };
  if (Number.isInteger(u.year)) out.year = u.year;
  if (u.category) out.category = u.category;
  out.description = u.description;
  out.owasp_entries = owasp_entries;
  if (Array.isArray(u.maestro_layers) && u.maestro_layers.length) {
    out.maestro_layers = u.maestro_layers;
  }
  out.attack_vector = u.attack_vector || 'Unknown';
  if (u.affected) out.affected = u.affected;
  if (u.impact) out.impact = u.impact;
  out.severity = SEVERITIES.has(u.severity) ? u.severity : 'Medium';
  if (Array.isArray(u.mitigations) && u.mitigations.length) out.mitigations = u.mitigations;
  if (references.length) out.references = references;
  if (Array.isArray(u.tags) && u.tags.length) out.tags = u.tags;
  return out;
}

async function loadUpstream() {
  if (FROM) {
    console.log(`Reading upstream from local file: ${FROM}`);
    return JSON.parse(fs.readFileSync(FROM, 'utf8'));
  }
  console.log(`Fetching upstream: ${UPSTREAM_URL}`);
  const res = await fetch(UPSTREAM_URL);
  if (!res.ok) throw new Error(`Upstream fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  const upstream = await loadUpstream();
  const all = upstream.incidents || [];
  const selected = all
    .filter(i => i.quality_tier === TIER)
    .map(mapIncident)
    .sort((a, b) => a.id.localeCompare(b.id));

  const out = {
    version: upstream.version || '0.0.0',
    generated: new Date().toISOString().slice(0, 10),
    source: {
      repo: UPSTREAM_REPO,
      ref: REF,
      tier: TIER,
      upstream_total: all.length,
      synced: selected.length,
      note: 'Generated view — curate incidents upstream, not here. See scripts/sync-incidents.mjs.',
    },
    incidents: selected,
  };

  const dest = path.join(ROOT, 'data', 'incidents.json');
  fs.writeFileSync(dest, JSON.stringify(out, null, 2) + '\n');
  console.log(
    `Synced ${selected.length} '${TIER}' incidents (of ${all.length} upstream) → data/incidents.json`,
  );
  console.log('Next: node scripts/generate.js  (regenerates entries + docs/incidents.js)');
}

main().catch(err => {
  console.error('sync-incidents failed:', err.message);
  process.exit(1);
});
