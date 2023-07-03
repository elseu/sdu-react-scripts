#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const params = process.argv.slice(2);

const currentBundle = require(params[0]);
const benchmarkBundle = require(params[1]);
const benchmarkBranch = params[2] || 'develop';
const threshold = Number(params[3]);

const prefix = '.next';
const outdir = path.join(process.cwd(), prefix, 'analyze');
const outfile = path.join(outdir, 'bundle-comparison.txt');

function formatBytes(bytes) {
  if (!+bytes) return '0 Bytes';

  const k = 1000;
  const dm = 2;
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  return `${parseFloat(Math.abs(bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getSign(bts) {
  const bytes = Number(bts);

  if (bytes < 0) return '🟢 -';
  if (bytes === 0) return '+';
  if (bytes > 0 && bytes < threshold) return '🟡 +';
  if (bytes > 0 && bytes >= threshold) return '🔴 +';
}

const sizes = currentBundle
  .map(({ path, size }) => {
    const benchmarkSize = benchmarkBundle.find((x) => x.path === path);
    const diff = size - benchmarkSize.size;

    const diffStr = benchmarkSize ? `${getSign(diff)}${formatBytes(diff)}` : 'added';
    return `| \`${path}\` | ${formatBytes(size, false)} | ${diffStr} |`;
  })
  .concat(
    benchmarkBundle
      .filter(({ path }) => !currentBundle.find((x) => x.path === path))
      .map(({ path }) => `| \`${path}\` | removed |`),
  )
  .join('\n');

const output = `
# Bundle Size Report
## Bundle Size (excluding shared js + gzipped)
| Route | Current | Difference with ${benchmarkBranch} |
| --- | --- | --- |
${sizes}
## Legend: 
🟡: increased within acceptable threshold of ${threshold} bytes.
🔴: increased outside acceptable threshold ${threshold} bytes.
<!-- GH BOT -->`;

try {
  fs.mkdirSync(outdir);
} catch (e) {
  // may already exist
}

fs.writeFileSync(outfile, output);
