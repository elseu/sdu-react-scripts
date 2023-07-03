# Product Site scripts
This package contains utility scripts for `sdu-titan-product-site`.

## install @elseu/sdu-react-scripts-product-site

`npm install -D @elseu/sdu-react-scripts-product-site`

## Setup linked packages
Symlink a package from another directory for easier local development.

### Usage
```bash
npx npx sdu-react-scripts-product-site-setup-linked-packages
```
This will bring up a prompt, just enter the package you want to symlink and it will handle the necessary steps for you.

## Bundle size utils: analyze bundles & compare bundle sizes
Node scripts to calculate and compare Next.js bundles by size. Intended to be used in CI, but can also be used locally. They are written with Sdu Titan Product Site in mind, but could in theory be made more generic to fit other Next.js projects.

### Usage
Make sure your dependencies are installed, then run the following commands directly or configure them in your `package.json`.

First create a Next.js build.

```bash
ANALYZE=true NODE_ENV=production next build
```

Then, to analyze.

```bash
npx sdu-react-scripts-product-site-analyze-bundle-size
```

This will produce a `bundle.json`. You can then input two of these files (e.g. from different branches), along with an accepted size difference threshold into the comparison script to get a report of the size differential.

```bash
npx sdu-react-scripts-product-site-compare-bundle-size $CURRENT_BUNDLE $BENCHMARK_BUNDLE $BENCHMARK_BRANCH_NAME $THRESHOLD
```