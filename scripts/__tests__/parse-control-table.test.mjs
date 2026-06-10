import assert from 'node:assert';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { parseControlTable } = require('../generate.js');

const soc2Body = [
  '| Criteria | How it applies |',
  '|---|---|',
  '| C1.1 — Confidentiality policy | Policy identifying confidential information in scope |',
].join('\n');
const regC1 = new Set(['C1.1', 'C2.1', 'CC6.1']);
const out = parseControlTable(soc2Body, 'SOC 2', null, regC1);
assert.strictEqual(out[0].control_id, 'C1.1', 'control_id should be the registry-matching code; got ' + JSON.stringify(out[0].control_id));
assert.strictEqual(out[0].control_name, 'Confidentiality policy', 'name should be the remainder; got ' + JSON.stringify(out[0].control_name));
console.log('ok: SOC 2 CODE—Name row parses to registry code');
