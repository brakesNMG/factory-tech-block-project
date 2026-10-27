// Writes WORKS_CITED.md from src/data/sources.js, keeping *italics* so it can be pasted into a doc.
import { writeFileSync } from 'node:fs';
import { SOURCES } from '../src/data/sources.js';

const body = SOURCES.map((s) => s.mla).join('\n\n');
writeFileSync('WORKS_CITED.md', `# Works Cited\n\n${body}\n`);
console.log(`Wrote WORKS_CITED.md (${SOURCES.length} entries)`);
