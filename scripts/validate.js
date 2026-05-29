#!/usr/bin/env node
/**
 * GenAI Security Crosswalk — Content Validator
 *
 * Checks all mapping files for structural integrity, internal link
 * resolution, bidirectional cross-references, naming conventions,
 * and changelog presence.
 *
 * Usage:
 *   node scripts/validate.js           # full validation
 *   node scripts/validate.js --quick   # skip cross-ref check
 *   node scripts/validate.js --file agentic-top10/Agentic_SAMM.md
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more checks failed
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

const MAPPING_FOLDERS = [
  'llm-top10',
  'agentic-top10',
  'dsgai-2026',
];

// Every mapping file must contain these heading patterns (case-insensitive)
const REQUIRED_SECTIONS = [
  /^#\s+.+×.+|^#\s+.+—.+/m,           // H1 title with × or —
  /^##\s+why\s+/im,                      // Why [framework] section
  /^##\s+quick.?reference/im,            // Quick-reference summary
  /^##\s+(audience|target audience)/im,  // Audience tags
  /^###\s+.*(01|ASI01|LLM01|DSGAI01)/im,// At least one detailed entry (first entry)
  /^##\s+references/im,                  // References section
  /^##\s+changelog/im,                   // Changelog section
];

// Naming convention: SourceList_Framework.md
// Valid prefixes
const VALID_PREFIXES = {
  'llm-top10':     /^LLM_/,
  'agentic-top10': /^Agentic_/,
  'dsgai-2026':    /^DSGAI_/,
};

// Known valid cross-reference IDs
const VALID_IDS = {
  llm:     Array.from({length: 10}, (_, i) => `LLM${String(i+1).padStart(2,'0')}`),
  agentic: Array.from({length: 10}, (_, i) => `ASI${String(i+1).padStart(2,'0')}`),
  dsgai:   Array.from({length: 21}, (_, i) => `DSGAI${String(i+1).padStart(2,'0')}`),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

let errors   = 0;
let warnings = 0;
const results = [];

function fail(file, msg) {
  errors++;
  results.push({ level: 'ERROR', file, msg });
}

function warn(file, msg) {
  warnings++;
  results.push({ level: 'WARN', file, msg });
}

function pass(file, msg) {
  results.push({ level: 'OK', file, msg });
}

function relPath(p) {
  return path.relative(ROOT, p).replace(/\\/g, '/');
}

// ─── Checks ───────────────────────────────────────────────────────────────────

/**
 * 1. Naming convention
 */
function checkNaming(folder, filename) {
  const pattern = VALID_PREFIXES[folder];
  if (!pattern.test(filename)) {
    fail(
      `${folder}/${filename}`,
      `Naming violation: expected prefix matching ${pattern} (got "${filename}")`
    );
    return false;
  }
  return true;
}

/**
 * 2. Required sections
 */
function checkSections(filePath, content) {
  const rel = relPath(filePath);
  let ok = true;
  for (const pattern of REQUIRED_SECTIONS) {
    if (!pattern.test(content)) {
      fail(rel, `Missing required section matching: ${pattern}`);
      ok = false;
    }
  }
  // Malformed "## Why" heading: a templating-substitution bug pasted the H1
  // title into the heading (e.g. "## Why # DSGAI 2026 × …"). The heading must
  // not contain a "#" after "Why".
  if (/^##\s+why\s+#/im.test(content)) {
    fail(rel, 'Malformed "## Why" heading (contains a "#" — templating-substitution bug)');
    ok = false;
  }
  if (ok) pass(rel, 'All required sections present');
  return ok;
}

/**
 * 3. Internal links — markdown links pointing to .md files must resolve
 */
function checkInternalLinks(filePath, content) {
  const rel   = relPath(filePath);
  const dir   = path.dirname(filePath);
  const linkRe = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  let broken = 0;

  while ((match = linkRe.exec(content)) !== null) {
    const href = match[2].split('#')[0]; // strip anchor
    // Only check relative .md links (not http, not anchors-only)
    if (!href || href.startsWith('http') || href.startsWith('mailto')) continue;
    if (!href.endsWith('.md')) continue;

    const target = path.resolve(dir, href);
    if (!fs.existsSync(target)) {
      fail(rel, `Broken internal link: [${match[1]}](${match[2]})`);
      broken++;
    }
  }

  if (broken === 0) pass(rel, 'All internal .md links resolve');
  return broken === 0;
}

/**
 * 4. Changelog entry — must have at least one dated entry
 */
function checkChangelog(filePath, content) {
  const rel = relPath(filePath);
  // Look for a date pattern in the changelog section
  const changelogSection = content.match(/## changelog[\s\S]*/i);
  if (!changelogSection) {
    fail(rel, 'No changelog section found');
    return false;
  }
  const datePattern = /\d{4}-\d{2}-\d{2}/;
  if (!datePattern.test(changelogSection[0])) {
    warn(rel, 'Changelog section found but no dated entry (YYYY-MM-DD format)');
    return false;
  }
  pass(rel, 'Changelog has dated entry');
  return true;
}

/**
 * 5. License header — must have CC BY-SA 4.0 declaration
 */
function checkHeader(filePath, content) {
  const rel = relPath(filePath);
  if (!content.includes('CC BY-SA 4.0')) {
    warn(rel, 'Missing CC BY-SA 4.0 license declaration in header');
    return false;
  }
  return true;
}

/**
 * 6. Cross-reference format — any ASI/LLM/DSGAI IDs mentioned must be valid
 */
function checkCrossRefFormat(filePath, content) {
  const rel = relPath(filePath);
  const idRe = /\b(LLM\d{2}|ASI\d{2}|DSGAI\d{2})\b/g;
  let match;
  let invalid = 0;
  const allValid = [
    ...VALID_IDS.llm,
    ...VALID_IDS.agentic,
    ...VALID_IDS.dsgai,
  ];

  while ((match = idRe.exec(content)) !== null) {
    const id = match[1];
    if (!allValid.includes(id)) {
      fail(rel, `Invalid vulnerability ID referenced: ${id}`);
      invalid++;
    }
  }

  if (invalid === 0) pass(rel, 'All referenced vulnerability IDs are valid');
  return invalid === 0;
}

/**
 * 6b. MITRE ATLAS URL hash-routing
 *     atlas.mitre.org is a single-page app using hash routing, so deep links
 *     must use the `/#/techniques/AML.TXXXX` form. The bare `/techniques/...`
 *     form (no `/#`) 404s. Same for /tactics/ and /mitigations/.
 */
function checkAtlasUrls(filePath, content) {
  const rel = relPath(filePath);
  // Match any atlas.mitre.org URL and capture the path that follows the host
  const urlRe = /https?:\/\/atlas\.mitre\.org(\/[^)\s"'<>]*)/g;
  let bad = 0;

  for (const match of content.matchAll(urlRe)) {
    const urlPath = match[1];
    // Routed sections must be reached via the SPA hash (`/#/...`)
    if (/^\/(techniques|tactics|mitigations|matrices|studies)\//.test(urlPath)) {
      fail(
        rel,
        `MITRE ATLAS URL must use hash routing (/#${urlPath}); bare ${urlPath} 404s`
      );
      bad++;
    }
  }

  if (bad === 0) pass(rel, 'MITRE ATLAS URLs use hash routing');
  return bad === 0;
}

/**
 * 7. Bidirectional cross-references
 *    If file A mentions "See also: Agentic_FOO.md", then Agentic_FOO.md
 *    should mention a link back to the source file or its parent source list.
 *
 *    This is a best-effort soft check (warn, not fail) because patterns vary.
 */
function buildCrossRefMap(allFiles) {
  const map = {}; // filePath → Set of internal .md files it links to

  for (const fp of allFiles) {
    const content = fs.readFileSync(fp, 'utf8');
    const linkRe  = /\[([^\]]*)\]\(([^)#)]+\.md)[^)]*\)/g;
    let match;
    map[fp] = new Set();

    while ((match = linkRe.exec(content)) !== null) {
      const href   = match[2];
      const target = path.resolve(path.dirname(fp), href);
      if (fs.existsSync(target)) {
        map[fp].add(path.resolve(target));
      }
    }
  }

  return map;
}

function checkBidirectional(allFiles, crossRefMap) {
  let issues = 0;

  for (const fp of allFiles) {
    const linked = crossRefMap[fp] || new Set();
    for (const targetFp of linked) {
      // Only check within mapping folders
      const isMapping = MAPPING_FOLDERS.some(f =>
        targetFp.includes(path.sep + f + path.sep) ||
        targetFp.includes('/' + f + '/')
      );
      if (!isMapping) continue;

      const targetLinks = crossRefMap[targetFp] || new Set();
      if (!targetLinks.has(path.resolve(fp))) {
        warn(
          relPath(fp),
          `One-way link to ${relPath(targetFp)} — consider adding a back-reference`
        );
        issues++;
      }
    }
  }

  return issues;
}

// ─── CROSSREF.md check ───────────────────────────────────────────────────────

/**
 * 8. CROSSREF.md must mention all LLM, ASI, and DSGAI IDs
 */
function checkCrossRefFile() {
  const crossRefPath = path.join(ROOT, 'CROSSREF.md');
  if (!fs.existsSync(crossRefPath)) {
    fail('CROSSREF.md', 'File does not exist');
    return;
  }

  const content = fs.readFileSync(crossRefPath, 'utf8');
  const missing = [];

  for (const id of [...VALID_IDS.llm, ...VALID_IDS.agentic, ...VALID_IDS.dsgai]) {
    if (!content.includes(id)) missing.push(id);
  }

  if (missing.length === 0) {
    pass('CROSSREF.md', 'All vulnerability IDs present');
  } else {
    warn('CROSSREF.md', `Missing vulnerability IDs: ${missing.join(', ')}`);
  }
}

// ─── README count consistency ─────────────────────────────────────────────────

/**
 * 9. README.md badge counts must match actual file counts
 */
function checkReadmeCounts() {
  const readmePath = path.join(ROOT, 'README.md');
  if (!fs.existsSync(readmePath)) {
    fail('README.md', 'File does not exist');
    return;
  }

  const content = fs.readFileSync(readmePath, 'utf8');

  // Count actual mapping files
  let actual = 0;
  for (const folder of MAPPING_FOLDERS) {
    const dir = path.join(ROOT, folder);
    if (fs.existsSync(dir)) {
      actual += fs.readdirSync(dir).filter(f => f.endsWith('.md')).length;
    }
  }

  // Extract badge count from README
  const badgeMatch = content.match(/mapping%20files-(\d+)-brightgreen/);
  if (!badgeMatch) {
    warn('README.md', 'Could not find mapping-files badge to verify count');
    return;
  }

  const badgeCount = parseInt(badgeMatch[1], 10);
  if (badgeCount !== actual) {
    fail(
      'README.md',
      `Badge says ${badgeCount} mapping files but found ${actual} on disk`
    );
  } else {
    pass('README.md', `Mapping file count consistent: ${actual}`);
  }
}

// ─── Shared resources check ───────────────────────────────────────────────────

/**
 * 10. Required shared files must exist
 */
function checkSharedResources() {
  const required = [
    'shared/RECIPES.md',
    'shared/TOOLS.md',
    'shared/GLOSSARY.md',
    'shared/SEVERITY.md',
    'data/schema.json',
    'CROSSREF.md',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'README.md',
  ];

  for (const rel of required) {
    const fp = path.join(ROOT, rel);
    if (!fs.existsSync(fp)) {
      fail(rel, 'Required file is missing');
    } else {
      pass(rel, 'Exists');
    }
  }
}

// ─── Evals check ───────────────────────────────────────────────────────────────

/**
 * 11. Eval profiles/scripts must reference a valid OWASP ID and an existing
 *     crosswalk file. Catches stale taxonomy IDs and broken/legacy paths
 *     (e.g. the retired `data-security/` directory) before they ship.
 */
function checkEvals() {
  const evalsDir = path.join(ROOT, 'evals');
  if (!fs.existsSync(evalsDir)) return; // evals are optional

  const allValid = new Set([
    ...VALID_IDS.llm, ...VALID_IDS.agentic, ...VALID_IDS.dsgai,
  ]);

  // Collect eval source files. garak/pyrit are per-entry profiles (require a
  // declared OWASP ID); the other tracks hold multi-entry configs/reporters
  // (path-checked only). Scan recursively so nested configs (e.g. guardrails/nemo)
  // are covered too.
  const perEntryDirs = new Set(['garak', 'pyrit']);
  const evalSubdirs = ['garak', 'pyrit', 'laaf', 'promptfoo', 'inspect', 'modelscan', 'guardrails', 'privacy'];
  const evalFiles = [];
  const walk = (dir, perEntry) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(full, perEntry); continue; }
      if (/\.(ya?ml|py)$/.test(entry.name) && !entry.name.startsWith('_') && entry.name !== 'run_all.sh') {
        evalFiles.push({ fp: full, perEntry });
      }
    }
  };
  for (const sub of evalSubdirs) {
    walk(path.join(evalsDir, sub), perEntryDirs.has(sub));
  }

  let issues = 0;
  for (const { fp, perEntry } of evalFiles) {
    const rel = relPath(fp);
    const content = fs.readFileSync(fp, 'utf8');

    // Stale/retired directory path
    if (content.includes('data-security/')) {
      fail(rel, 'References retired `data-security/` path (use `dsgai-2026/`)');
      issues++;
    }

    // Declared OWASP entry ID — from "OWASP Entry : <ID>" or entry_id="<ID>"
    const idMatch =
      content.match(/OWASP Entry\s*:\s*(LLM\d{2}|ASI\d{2}|DSGAI\d{2})/i) ||
      content.match(/entry_id\s*=\s*["'](LLM\d{2}|ASI\d{2}|DSGAI\d{2})["']/i);
    if (idMatch) {
      const id = idMatch[1].toUpperCase();
      if (!allValid.has(id)) {
        fail(rel, `Eval references invalid/out-of-range OWASP ID: ${id}`);
        issues++;
      }
    } else if (perEntry) {
      warn(rel, 'Eval has no declared OWASP entry ID (expected "OWASP Entry: <ID>")');
    }

    // Declared crosswalk reference path must resolve
    const refMatch =
      content.match(/Crosswalk ref\s*:\s*(\S+\.md)/i) ||
      content.match(/crosswalk_ref\s*=\s*["']([^"']+\.md)["']/i);
    if (refMatch) {
      const refPath = path.join(ROOT, refMatch[1]);
      if (!fs.existsSync(refPath)) {
        fail(rel, `Eval crosswalk ref does not resolve: ${refMatch[1]}`);
        issues++;
      }
    }
  }

  if (evalFiles.length > 0 && issues === 0) {
    pass('evals/', `All ${evalFiles.length} eval profiles reference valid IDs and crosswalk paths`);
  }
}

// ─── DSGAI canonical taxonomy check ─────────────────────────────────────────

/**
 * 12. DSGAI entry headings must not use a retired pre-release taxonomy.
 *     Several dsgai-2026 files historically shipped *wholesale-different*
 *     taxonomies (e.g. "DSGAI01 — Prompt Injection via Data Channels" or
 *     "DSGAI01 — Data Access Logging"). The validator only checked the ID
 *     token, so the drift went unnoticed. Canonical headings vary slightly in
 *     wording across files, so this uses a blocklist of distinctive retired
 *     names rather than an exact-match list — it flags the wrong-taxonomy
 *     problem without false-flagging legitimate wording variants.
 */
const RETIRED_DSGAI_NAMES = new Set([
  // Pre-release taxonomy A (NHI / NIST SP 800-82 / SAMM)
  'Prompt Injection via Data Channels', 'Training Data Poisoning',
  'Sensitive Data in Training Sets', 'Insecure Data Pipelines',
  'Guardrail Circumvention', 'Unintended Data Disclosure',
  'Excessive Data Access', 'Data Leakage in Retrieval',
  'RAG Corpus Manipulation', 'Context Window Poisoning',
  'Session Persistence Attacks', 'Model Inversion and Extraction',
  'Data Leakage through Tool Integration', 'Model Weight Theft',
  'Inference Data Exposure', 'Third-Party Data Dependencies',
  'Model Supply Chain Risks', 'Data Retention and Deletion Failures',
  'Cascading Data Failures', 'Regulatory Non-Compliance in Data Use',
  'Data Provenance and Lineage Failures',
  // Pre-release taxonomy B (SP 800-218A)
  'Data Access Logging', 'Data Visibility & Transparency',
  'Shadow AI & Unvetted Tools', 'Data Provenance & Quality',
  'Data Lineage Fragmentation', 'Excessive Data Aggregation',
  'Intellectual Property Theft', 'Synthetic Data Generation Risk',
  'Data Ownership & Monetisation', 'Data Misuse & Manipulation',
  'Consent Management Failures', 'Data Minimisation Violations',
  'Erosion of Privacy', 'Bias in Data', 'Governance Gaps',
  'Data Localization Violations', 'Non-Compliance with Data Laws',
]);

function checkDsgaiTaxonomy() {
  const dir = path.join(ROOT, 'dsgai-2026');
  if (!fs.existsSync(dir)) return;
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  // Accept em-dash, en-dash, or hyphen as the heading separator.
  const headingRe = /^###\s+DSGAI(\d{2})\s*[—–-]\s*(.+?)\s*$/gm;

  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith('.md')) continue;
    const rel = `dsgai-2026/${filename}`;
    const content = fs.readFileSync(path.join(dir, filename), 'utf8');
    let bad = 0;
    for (const m of content.matchAll(headingRe)) {
      const name = norm(m[2]);
      if (RETIRED_DSGAI_NAMES.has(name)) {
        fail(rel, `DSGAI${m[1]} uses retired pre-release taxonomy name: "${name}"`);
        bad++;
      }
    }
    if (bad === 0) pass(rel, 'DSGAI headings free of retired taxonomy names');
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function collectMappingFiles(targetFile) {
  if (targetFile) {
    const fp = path.join(ROOT, targetFile);
    return fs.existsSync(fp) ? [fp] : [];
  }

  const files = [];
  for (const folder of MAPPING_FOLDERS) {
    const dir = path.join(ROOT, folder);
    if (!fs.existsSync(dir)) continue;
    for (const filename of fs.readdirSync(dir)) {
      if (filename.endsWith('.md')) {
        files.push(path.join(dir, filename));
      }
    }
  }
  return files;
}

function run() {
  const args       = process.argv.slice(2);
  const quickMode  = args.includes('--quick');
  const fileArg    = args.indexOf('--file');
  const targetFile = fileArg !== -1 ? args[fileArg + 1] : null;

  console.log('GenAI Security Crosswalk — Content Validator');
  console.log('='.repeat(50));
  if (quickMode)  console.log('Mode: quick (cross-ref bidirectionality skipped)');
  if (targetFile) console.log(`Mode: single file (${targetFile})`);
  console.log('');

  // Structural checks
  checkSharedResources();
  checkCrossRefFile();
  checkReadmeCounts();
  checkEvals();
  checkDsgaiTaxonomy();

  // Per-file checks
  const allFiles = collectMappingFiles(targetFile);
  console.log(`Checking ${allFiles.length} mapping file(s)...\n`);

  for (const fp of allFiles) {
    const folder   = path.basename(path.dirname(fp));
    const filename = path.basename(fp);
    const content  = fs.readFileSync(fp, 'utf8');

    checkNaming(folder, filename);
    checkSections(fp, content);
    checkInternalLinks(fp, content);
    checkChangelog(fp, content);
    checkHeader(fp, content);
    checkCrossRefFormat(fp, content);
    checkAtlasUrls(fp, content);
  }

  // Bidirectional cross-reference check (expensive — skip in quick mode)
  if (!quickMode && !targetFile) {
    console.log('Checking bidirectional cross-references...\n');
    const crossRefMap = buildCrossRefMap(allFiles);
    checkBidirectional(allFiles, crossRefMap);
  }

  // ─── Report ───────────────────────────────────────────────────────────────

  console.log('\n' + '='.repeat(50));
  console.log('RESULTS');
  console.log('='.repeat(50) + '\n');

  // Group by level
  const byLevel = { ERROR: [], WARN: [], OK: [] };
  for (const r of results) byLevel[r.level].push(r);

  if (byLevel.ERROR.length > 0) {
    console.log(`ERRORS (${byLevel.ERROR.length}):`);
    for (const r of byLevel.ERROR) {
      console.log(`  ✗ [${r.file}] ${r.msg}`);
    }
    console.log('');
  }

  if (byLevel.WARN.length > 0) {
    console.log(`WARNINGS (${byLevel.WARN.length}):`);
    for (const r of byLevel.WARN) {
      console.log(`  ⚠ [${r.file}] ${r.msg}`);
    }
    console.log('');
  }

  console.log(`Summary: ${byLevel.ERROR.length} error(s), ${byLevel.WARN.length} warning(s), ${byLevel.OK.length} passed`);

  if (errors > 0) {
    console.log('\n✗ Validation FAILED');
    process.exit(1);
  } else {
    console.log('\n✓ Validation PASSED');
    process.exit(0);
  }
}

run();
