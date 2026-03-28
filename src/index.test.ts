import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';
import { entries, incidents, getEntry, getFramework, searchEntries, frameworks, getBySeverity, getIncidentsForEntry } from './index';

describe('@owasp/genai-crosswalk', () => {
  it('loads all 41 entries', () => {
    assert.equal(entries.length, 41);
  });

  it('loads 31 incidents', () => {
    assert.ok(incidents.length >= 31);
  });

  it('getEntry returns LLM01', () => {
    const e = getEntry('LLM01');
    assert.ok(e);
    assert.equal(e.id, 'LLM01');
    assert.equal(e.severity, 'Critical');
  });

  it('getEntry is case-insensitive', () => {
    assert.ok(getEntry('llm01'));
    assert.ok(getEntry('asi01'));
  });

  it('getEntry returns undefined for unknown ID', () => {
    assert.equal(getEntry('FAKE99'), undefined);
  });

  it('frameworks includes all 18', () => {
    assert.ok(frameworks.length >= 18);
    assert.ok(frameworks.includes('EU AI Act'));
    assert.ok(frameworks.includes('NIST SP 800-218A'));
  });

  it('getFramework returns entries for EU AI Act', () => {
    const r = getFramework('EU AI Act');
    assert.ok(r.entries.length > 0);
    assert.ok(r.controls.length > 0);
  });

  it('searchEntries finds prompt injection', () => {
    const r = searchEntries('prompt injection');
    assert.ok(r.length > 0);
    assert.ok(r.some(e => e.id === 'LLM01'));
  });

  it('getBySeverity returns Critical entries', () => {
    const r = getBySeverity('Critical');
    assert.ok(r.length > 0);
    assert.ok(r.every(e => e.severity === 'Critical'));
  });

  it('getIncidentsForEntry returns incidents for LLM01', () => {
    const r = getIncidentsForEntry('LLM01');
    assert.ok(r.length > 0);
  });

  it('every entry has mappings array', () => {
    for (const e of entries) {
      assert.ok(Array.isArray(e.mappings), `${e.id} missing mappings`);
    }
  });

  it('every incident has required fields', () => {
    for (const i of incidents) {
      assert.ok(i.id, 'missing id');
      assert.ok(i.title, 'missing title');
      assert.ok(i.owasp_entries.length > 0, `${i.id} missing owasp_entries`);
      assert.ok(i.maestro_layers.length > 0, `${i.id} missing maestro_layers`);
    }
  });
});
