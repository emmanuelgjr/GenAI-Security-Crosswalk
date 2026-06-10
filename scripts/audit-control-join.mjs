#!/usr/bin/env node
/**
 * audit-control-join.mjs — Report entry-mapping control_ids that do not resolve
 * to a control in their framework's registry. Exit 1 if any miss is found.
 *
 * Usage:
 *   node scripts/audit-control-join.mjs                 # all frameworks, summary + exit code
 *   node scripts/audit-control-join.mjs --framework "SOC 2"   # one framework, list misses
 */
import { readdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FW_DIR = join(ROOT, 'data', 'frameworks');
const ENTRY_DIR = join(ROOT, 'data', 'entries');

const only = (() => {
  const i = process.argv.indexOf('--framework');
  return i >= 0 ? process.argv[i + 1] : null;
})();

const registry = {};
for (const f of readdirSync(FW_DIR).filter(f => f.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(join(FW_DIR, f), 'utf8'));
  registry[d.name] = new Set((d.controls || []).map(c => c.control_id));
}

const misses = {};
let total = 0;
for (const f of readdirSync(ENTRY_DIR).filter(f => f.endsWith('.json'))) {
  const e = JSON.parse(readFileSync(join(ENTRY_DIR, f), 'utf8'));
  for (const m of e.mappings || []) {
    const reg = registry[m.framework];
    if (!reg) continue;
    if (!reg.has(m.control_id)) {
      (misses[m.framework] ||= []).push({ entry: e.id, control_id: m.control_id, control_name: m.control_name || '' });
      total++;
    }
  }
}

if (only) {
  const list = misses[only] || [];
  console.log(`${only}: ${list.length} miss(es)`);
  for (const x of list) console.log(`  ${x.entry}  id=${JSON.stringify(x.control_id)}  name=${JSON.stringify(x.control_name)}`);
} else {
  const names = Object.keys(misses).sort((a, b) => misses[b].length - misses[a].length);
  for (const n of names) console.log(`  ${n.padEnd(26)} ${misses[n].length}`);
  console.log(`TOTAL join-misses: ${total}`);
}
process.exit(total > 0 ? 1 : 0);
