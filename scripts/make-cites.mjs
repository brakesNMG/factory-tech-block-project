// Writes WORKS_CITED.md from content/works-cited.md, formatted for pasting into a document.
import { readFileSync, writeFileSync } from 'node:fs';
import { parseSources } from '../src/data/parse.js';

const sources = parseSources(readFileSync('content/works-cited.md', 'utf8'));
writeFileSync('WORKS_CITED.md', `# Works Cited\n\n${sources.map((s) => s.mla).join('\n\n')}\n`);
console.log(`Wrote WORKS_CITED.md (${sources.length} entries)`);
