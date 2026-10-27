// Checks every file in /content and explains problems in plain English.  Run:  npm run check
import { readdirSync, readFileSync } from 'node:fs';
import { parseExhibit, parseSources, lengthWarnings } from '../src/data/parse.js';

const dir = 'content/exhibits/';
let errors = 0;
let warnings = 0;
let exhibits = 0;
let pages = 0;
let questions = 0;

readdirSync(dir).filter((f) => f.endsWith('.md')).sort().forEach((f, i) => {
  try {
    const ex = parseExhibit(dir + f, readFileSync(dir + f, 'utf8'), i);
    exhibits++; pages += ex.pages.length; questions += ex.quiz.length;
    lengthWarnings(ex).forEach((w) => { warnings++; console.log('  Warning: ' + w); });
  } catch (e) {
    errors++; console.log('  PROBLEM: ' + e.message);
  }
});

const cites = parseSources(readFileSync('content/works-cited.md', 'utf8'));
if (!cites.length) { errors++; console.log('  PROBLEM: content/works-cited.md has no entries (each starts with "- ")'); }

console.log(`\n${exhibits} exhibits, ${pages} lesson pages, ${questions} quiz questions, ${cites.length} sources.`);
console.log(errors ? `${errors} problem(s) to fix before the game will load.` : warnings ? `OK, with ${warnings} warning(s) about text length.` : 'All good.');
process.exit(errors ? 1 : 0);
