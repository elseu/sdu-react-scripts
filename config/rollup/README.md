# Rollup

## Extending Rollup config
If you want to use this Rollup configuration in a React project, you can install it with the following steps.

First, install this package by running `npm i sdu-react-scripts -D` .
Then install Rollup ad peer dependency. Just copy this line and paste in your terminal.
```
npm install --save-dev rollup
```

Then create a file named rollup.config.js with following contents in the root folder of your project:
```javascript
// rollup.config.js
import createDefaultRollupConfig from 'sdu-react-scripts/config/rollup'

import pkg from './package.json';

export default {
  ...createDefaultRollupConfig(pkg),
  // Your custom Rollup config here...
}
```

If you are using the package `@elseu/sdu-titan` in your project you need the custom babel plugin [transform-titan-pure-annotations](../../plugins/babel/README.md).

