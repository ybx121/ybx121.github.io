import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const root = new URL('./dist/', import.meta.url);
const base = new URL('https://ybx121.github.io/');
const maxAttempts = process.argv.includes('--once') ? 1 : 6;

async function listFiles(directory = '') {
  const entries = await readdir(new URL(directory, root), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const name = `${directory}${entry.name}`;
    if (entry.isDirectory()) files.push(...await listFiles(`${name}/`));
    else if (entry.isFile()) files.push(name);
    else throw new Error(`Unsupported website entry: ${name}`);
  }
  return files.sort();
}

function hash(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

const files = await listFiles();
if (!files.includes('index.html')) throw new Error('dist/index.html is missing.');
const expected = new Map(await Promise.all(files.map(async name => [
  name, hash(await readFile(new URL(name, root))),
])));

async function check(name, attempt) {
  const url = new URL(name === 'index.html' ? '' : name, base);
  url.searchParams.set('verify', `${Date.now()}-${attempt}`);
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return `${name}: HTTP ${response.status}`;
    const actual = hash(new Uint8Array(await response.arrayBuffer()));
    return actual === expected.get(name) ? null : `${name}: content differs`;
  } catch (error) {
    return `${name}: ${error.message}`;
  }
}

let pending = files;
for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const failures = [];
  for (let start = 0; start < pending.length; start += 4) {
    const names = pending.slice(start, start + 4);
    const results = await Promise.all(names.map(name => check(name, attempt)));
    results.forEach((message, index) => {
      if (message) failures.push({ name: names[index], message });
    });
  }
  if (!failures.length) {
    console.log(`Verified ${files.length} public files against local dist: ${base.href}`);
    break;
  }
  console.error(`Verification ${attempt}/${maxAttempts}:\n${failures.map(x => x.message).join('\n')}`);
  pending = failures.map(x => x.name);
  if (attempt === maxAttempts) process.exitCode = 1;
  else await delay(15000);
}
