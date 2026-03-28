/**
 * @owasp/genai-crosswalk
 * Machine-readable GenAI security risk mappings across 18 frameworks
 */

// ── Types ───────────────────────────────────────────────────────────────────

export interface Mapping {
  framework: string;
  control_id: string;
  control_name: string;
  tier?: string;
  notes?: string;
}

export interface Tool {
  name: string;
  url: string;
  type?: string;
}

export interface IncidentRef {
  name: string;
  url: string;
  year: number;
  incident_id: string;
}

export interface Entry {
  id: string;
  name: string;
  source_list: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  aivss_score?: number;
  audience: string[];
  mappings: Mapping[];
  tools: Tool[];
  incidents: IncidentRef[];
  cross_references?: string[];
}

export interface MaestroLayer {
  layer: string;
  label: string;
  role: 'origin' | 'propagation' | 'impact' | 'blind-spot';
  notes: string;
}

export interface Reference {
  title: string;
  url: string;
  type: string;
}

export interface Incident {
  id: string;
  title: string;
  date: string;
  year: number;
  category: 'real-world' | 'research-demonstrated' | 'red-team';
  description: string;
  owasp_entries: string[];
  maestro_layers: MaestroLayer[];
  attack_vector: string;
  affected: string;
  impact: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  mitigations: string[];
  references: Reference[];
  tags: string[];
}

export interface CrosswalkDB {
  entries: Entry[];
  incidents: Incident[];
  frameworks: string[];
  version: string;
}

// ── Data loading ────────────────────────────────────────────────────────────

import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, '..', 'data');

let _entries: Entry[] | undefined;
let _incidents: Incident[] | undefined;

function loadEntries(): Entry[] {
  if (_entries) return _entries;
  const dir = path.join(DATA_DIR, 'entries');
  _entries = fs.readdirSync(dir)
    .filter((f: string) => f.endsWith('.json'))
    .map((f: string) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Entry)
    .sort((a: Entry, b: Entry) => a.id.localeCompare(b.id));
  return _entries;
}

function loadIncidents(): Incident[] {
  if (_incidents) return _incidents;
  const file = path.join(DATA_DIR, 'incidents.json');
  const db = JSON.parse(fs.readFileSync(file, 'utf8'));
  _incidents = db.incidents as Incident[];
  return _incidents;
}

// ── Public API ──────────────────────────────────────────────────────────────

/** All 41 OWASP GenAI entries */
export const entries: Entry[] = loadEntries();

/** All documented incidents */
export const incidents: Incident[] = loadIncidents();

/** All framework names found in mappings */
export const frameworks: string[] = [...new Set(
  entries.flatMap(e => e.mappings.map(m => m.framework))
)].sort();

/** Package version */
export const version = '1.6.0';

/** Get a single entry by ID (e.g. 'LLM01', 'ASI01', 'DSGAI04') */
export function getEntry(id: string): Entry | undefined {
  return entries.find(e => e.id === id.toUpperCase());
}

/** Get all entries mapped to a specific framework */
export function getFramework(framework: string): { framework: string; entries: Entry[]; controls: Mapping[] } {
  const query = framework.toLowerCase();
  const matched = entries.filter(e =>
    e.mappings.some(m => m.framework.toLowerCase().includes(query))
  );
  const controls = matched.flatMap(e =>
    e.mappings.filter(m => m.framework.toLowerCase().includes(query))
  );
  const fwName = controls[0]?.framework || framework;
  return { framework: fwName, entries: matched, controls };
}

/** Search entries by keyword in name, mappings, or tools */
export function searchEntries(query: string): Entry[] {
  const q = query.toLowerCase();
  return entries.filter(e =>
    e.id.toLowerCase().includes(q) ||
    e.name.toLowerCase().includes(q) ||
    e.mappings.some(m => m.control_id?.toLowerCase().includes(q) || m.control_name?.toLowerCase().includes(q)) ||
    e.tools.some(t => t.name.toLowerCase().includes(q))
  );
}

/** Get entries by severity */
export function getBySeverity(severity: 'Critical' | 'High' | 'Medium' | 'Low'): Entry[] {
  return entries.filter(e => e.severity === severity);
}

/** Get entries by source list */
export function getBySourceList(sourceList: string): Entry[] {
  const q = sourceList.toLowerCase();
  return entries.filter(e => e.source_list.toLowerCase().includes(q));
}

/** Get incidents for a specific OWASP entry */
export function getIncidentsForEntry(id: string): Incident[] {
  const uid = id.toUpperCase();
  return incidents.filter(i => i.owasp_entries.includes(uid));
}

/** Get incidents by MAESTRO layer */
export function getIncidentsByLayer(layer: string): Incident[] {
  return incidents.filter(i => i.maestro_layers.some(l => l.layer === layer));
}

/** Full database export */
export function getDatabase(): CrosswalkDB {
  return { entries, incidents, frameworks, version };
}
