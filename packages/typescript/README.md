# Typescript Configuration

## Extending TSConfig base

This package provides a shared [TSConfig Base](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases) with a set of default options for your Typescript compiler.

If you want to have your project extend from this base, you can install it with the following steps.

First, install this package by running `npm i -D @elseu/sdu-react-scripts-typescript` .
Then, create a `tsconfig.json` in your own project that extends this base configuration while defining project specific options on top of it:

```json
{
  "extends": "@elseu/sdu-react-scripts-typescript/tsconfig.json",
  ... // Project-specific configuration goes here
}
```

## Are Values Merged?

At time of writing, the `compilerOptions` object in extended and project-specific configurations will be merged. Arrays however, such as `exclude` or `include`, are **not** merged but overwritten. E.g. should your `exclude` be different from the base, you will need to redefine it as a whole.
