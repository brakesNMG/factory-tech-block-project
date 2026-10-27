// Parses the plain-text content files in /content into the objects the game uses.
// No browser or Vite code in here, so the checker script can use it too.
//
// Exhibit file format (see CONTENT_GUIDE.md):
//   # Exhibit name
//   year: 1733            <- details, one per line, before the first "##"
//   ## Page: Page title   <- lesson pages, any text underneath
//   ## Quiz               <- Q: question, "- [x]" right answer, "- [ ]" wrong answers, Explain: ...

function fail(file, msg) {
  throw new Error(`Content problem in ${file}: ${msg}`);
}

const clean = (s) => s.replace(/\r/g, '').trim();

export function parseExhibit(file, raw, order) {
  const lines = raw.replace(/\r/g, '').split('\n');
  const h1 = lines.findIndex((l) => /^# /.test(l));
  if (h1 < 0) fail(file, 'the first line must be "# Exhibit name"');
  const ex = { id: file.replace(/^.*\//, '').replace(/\.md$/, '').replace(/^\d+-/, ''), name: lines[h1].slice(2).trim(), pages: [], quiz: [], order };

  // split into the detail block and "## " sections
  const sections = [];
  let cur = { head: null, body: [] };
  for (let i = h1 + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) { sections.push(cur); cur = { head: lines[i].slice(3).trim(), body: [] }; } else cur.body.push(lines[i]);
  }
  sections.push(cur);

  // details
  const det = {};
  sections[0].body.forEach((l) => {
    if (!l.trim()) return;
    const m = l.match(/^([a-z]+):\s*(.*)$/i);
    if (!m) fail(file, `unexpected line before the first "##": "${l}". Details look like  year: 1733`);
    det[m[1].toLowerCase()] = m[2].trim();
  });
  ['year', 'by', 'summary', 'tile', 'art'].forEach((k) => { if (!det[k]) fail(file, `missing "${k}:" line near the top`); });
  const tile = det.tile.split(',').map((n) => parseInt(n, 10));
  if (tile.length !== 2 || tile.some(Number.isNaN)) fail(file, 'tile must look like  tile: 5, 7');
  ex.year = parseInt(det.year, 10);
  if (Number.isNaN(ex.year)) fail(file, 'year must be a number');
  Object.assign(ex, { inventor: det.by, summary: det.summary, tile, art: det.art });
  if (det.activity) ex.activity = det.activity;

  sections.slice(1).forEach((sec) => {
    const pm = sec.head.match(/^Page:\s*(.+)$/i);
    if (pm) {
      const text = clean(sec.body.join('\n'));
      if (!text) fail(file, `page "${pm[1]}" has no text`);
      ex.pages.push({ title: pm[1].trim(), text });
    } else if (/^Quiz$/i.test(sec.head)) {
      ex.quiz.push(parseQuiz(file, sec.body));
    } else {
      fail(file, `unknown section "## ${sec.head}". Use "## Page: Title" or "## Quiz"`);
    }
  });

  if (!ex.pages.length) fail(file, 'needs at least one "## Page: ..." section');
  if (!ex.quiz.length) fail(file, 'needs at least one "## Quiz" section');
  return ex;
}

function parseQuiz(file, body) {
  const q = { q: '', options: [], answer: -1, explain: '' };
  let field = null;
  body.forEach((l) => {
    const t = l.trim();
    let m;
    if ((m = t.match(/^Q:\s*(.*)$/i))) { q.q = m[1]; field = 'q'; }
    else if ((m = t.match(/^- \[( |x|X)\]\s*(.*)$/))) {
      if (m[1].toLowerCase() === 'x') q.answer = q.options.length;
      q.options.push(m[2]); field = null;
    } else if ((m = t.match(/^Explain:\s*(.*)$/i))) { q.explain = m[1]; field = 'explain'; }
    else if (t && field) q[field] += ' ' + t;
    else if (t) fail(file, `quiz line not understood: "${t}"`);
  });
  if (!q.q) fail(file, 'a quiz is missing its "Q:" question line');
  if (q.options.length !== 3) fail(file, `quiz "${q.q.slice(0, 40)}..." needs exactly 3 answers, found ${q.options.length}`);
  if (q.answer < 0) fail(file, `quiz "${q.q.slice(0, 40)}..." has no right answer. Mark one with "- [x]"`);
  if ((q.options.join('').match(/\[x\]/gi) || []).length) fail(file, 'only one answer may be marked right');
  if (!q.explain) fail(file, `quiz "${q.q.slice(0, 40)}..." is missing its "Explain:" line`);
  return q;
}

export function parseSources(raw) {
  return raw.replace(/\r/g, '').split('\n').filter((l) => /^- /.test(l)).map((l) => ({ mla: l.slice(2).trim() }));
}

// Soft limits so text fits on screen. Returns a list of warnings.
export function lengthWarnings(ex) {
  const w = [];
  ex.pages.forEach((p) => { if (p.text.length > 700) w.push(`${ex.name}, page "${p.title}" is ${p.text.length} characters (aim for under 600) and may not fit`); });
  ex.quiz.forEach((q) => {
    if (q.q.length > 95) w.push(`${ex.name}: a quiz question is ${q.q.length} characters (aim for under 90)`);
    q.options.forEach((o) => { if (o.length > 85) w.push(`${ex.name}: an answer is ${o.length} characters (aim for under 80): "${o.slice(0, 30)}..."`); });
  });
  return w;
}
