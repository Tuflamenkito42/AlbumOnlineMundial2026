#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const defaultSnapshot = path.resolve(
  process.cwd(),
  'c:\\Users\\juehr\\AppData\\Roaming\\Code\\User\\workspaceStorage\\ee004c0ee3ab0c8888958a0c8e74dc56\\GitHub.copilot-chat\\chat-session-resources\\ad3b6d60-9008-44d9-8966-9de62f4a4bf7\\call_CcmQvX0bWvigHX1TKzRW0Auv__vscode-1778484332194\\content.txt'
);

const inputPath = process.argv[2] || defaultSnapshot;
const outPath = path.resolve(process.cwd(), 'src', 'data', 'checklist.json');

if (!fs.existsSync(inputPath)) {
  console.error('Snapshot input file not found:', inputPath);
  process.exit(2);
}

const text = fs.readFileSync(inputPath, 'utf8');

// Extract row strings from the snapshot: lines like - row "..." [ref=
const rowRegex = /- row "([^"]+)" \[ref=/g;
const rows = [];
let m;
while ((m = rowRegex.exec(text))) {
  rows.push(m[1]);
}

const parsed = rows.map((row, index) => {
  // Capture the last three whitespace-separated tokens as need/offer/ratio
  const tailMatch = row.match(/\s(\S+)\s(\S+)\s(\S+)$/);
  let need = null;
  let offer = null;
  let ratio = null;
  let before = row;
  if (tailMatch) {
    need = tailMatch[1];
    offer = tailMatch[2];
    ratio = tailMatch[3];
    before = row.slice(0, tailMatch.index).trim();
  }

  // First token is the code (e.g., FWC1, MEX2, 00)
  const firstSpace = before.indexOf(' ');
  const code = firstSpace === -1 ? before : before.slice(0, firstSpace);
  const middle = firstSpace === -1 ? '' : before.slice(firstSpace + 1).trim();

  // Guess type: often the last token of 'before' (before numbers)
  const tokens = before.split(' ');
  const possibleType = tokens[tokens.length - 1];
  const type = ['foil', 'silver', 'gold', 'bronze', '-'].includes(possibleType) ? possibleType : '-';

  // Heuristic: derive series/group from code prefix (letters before digits)
  const codeMatch = code.match(/^([A-Z]+)(\d*)$/i);
  const series = codeMatch ? (codeMatch[1].toUpperCase() === 'FWC' ? 'FWC' : codeMatch[1].toUpperCase()) : null;

  return {
    id: code,
    raw: middle,
    type,
    need,
    offer,
    ratio,
    series,
    _source_row_index: index + 1,
  };
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2), 'utf8');
console.log('Wrote', parsed.length, 'rows to', outPath);
