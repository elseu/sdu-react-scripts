# Babel 

## Plugin: transform-titan-pure-annotations
With this babel plugin you can transform @elseu/sdu-titan to make it export only pure functions.
Since sdu-titan exports a hoc names withTitan, many frameworks don't recognize this as a pure function. 
You can use this babel plugin with rollup like this:

```js
// .babelrc
{
  "plugins": [
    "./node_modules/sdu-react-scripts/plugins/babel/transform-titan-pure-annotations"
  ]
}
```
```js
// rollup.config.js
import defaultRollupConfig from 'sdu-react-scripts/config/rollup'
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import pkg from './package.json';

const defaultRollupConfig = createDefaultRollupConfig(pkg);

export default {
  ...defaultRollupConfig,

  plugins: [
    ...defaultRollupConfig.plugins,

    // Rollup babel plugin added below
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, '.babelrc'),
    }),
  ]
  // Your custom Rollup config here...
}
```
