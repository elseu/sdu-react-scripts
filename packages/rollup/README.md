# Rollup

## Extending Rollup config

If you want to use this Rollup configuration in a React project, you can install it with the following steps.

First, install this package by running `npm i @elseu/sdu-react-scripts-rollup -D` .
Then install Rollup as a peer dependency. Just copy this line and paste in your terminal.

```
npm install --save-dev rollup
```

Then create a file named rollup.config.mjs with following contents in the root folder of your project:

```javascript
// rollup.config.js
import createDefaultRollupConfig from '@elseu/sdu-react-scripts-rollup';
import { readFile } from 'fs/promises';

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url)));

export default {
  ...createDefaultRollupConfig.default(pkg),
  // Your custom Rollup config here...
};
```

The default rollup config uses entry points in your package json. They should be like this:

```
{
  // ...other package.json props,
  "source": "src/index.ts",
  "types": "dist/types/index.d.ts",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
}
```

If you are using the package `@elseu/sdu-titan` in your project you need the custom babel plugin [transform-titan-pure-annotations](../../plugins/babel/README.md).
