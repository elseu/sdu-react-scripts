#!/usr/bin/env node
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const bundle = require(`${cwd}/.next/build-manifest.json`);

const prefix = '.next';
const outdir = path.join(cwd, prefix, 'analyze');
const outfileTxt = path.join(outdir, 'bundle-sizes.txt');
const outfileJson = path.join(outdir, 'bundle.json');

function formatBytes(bytes) {
  if (!+bytes) return '0 Bytes';

  const k = 1000;
  const dm = 2;
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  return `${parseFloat(Math.abs(bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const pageSizes = Object.keys(bundle.pages).map((p) => {
  /** Filter out chunks shared by all */
  const files = bundle.pages[p].filter(
    (file) => !file.includes('webpack') && !file.includes('framework') && !file.includes('main'),
  );
  const size = files
    .map((filename) => {
      const fn = path.join(process.cwd(), prefix, filename);
      const bytes = fs.readFileSync(fn);
      const gzipped = zlib.gzipSync(bytes);
      return gzipped.byteLength;
    })
    .reduce((s, b) => s + b, 0);

  return { path: p, size };
});

// Produce a Markdown table with each page & its size
const sizes = pageSizes
  .map(({ path, size }) => `| \`${path}\` | ${formatBytes(size)} |`)
  .join('\n');

const output = `# Bundle Size
| Route | Size (gzipped) |
| --- | --- |
${sizes}
<!-- GH BOT -->`;

try {
  fs.mkdirSync(outdir);
} catch (e) {
  // may already exist
}

/** For GitHub Actions bot */
fs.writeFileSync(outfileTxt, output);
/** For bundle comparison script */
fs.writeFileSync(outfileJson, JSON.stringify(pageSizes));
