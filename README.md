# sdu-react-scripts
Generic scripts and config files for your next React project

## Contents
- [Eslint Config](/config/eslint/index.js)

## Installation
`npm install -D sdu-react-scripts`

## Features

### Extending ESLint
If you want to use this ESLint configuration in a React project, you can install it with the following steps.

First, install this package, ESLint and the necessary plugins.
```
npm install --save-dev eslint@6.x @typescript-eslint/eslint-plugin@3.x @typescript-eslint/parser@3.x eslint-config-react-app@5.x eslint-config-standard@14.x eslint-import-resolver-typescript@2.x eslint-plugin-flowtype@5.x eslint-plugin-import@2.x eslint-plugin-jsx-a11y@6.x eslint-plugin-node@11.x eslint-plugin-promise@4.x eslint-plugin-react@7.x eslint-plugin-react-hooks@4.x eslint-plugin-simple-import-sort@5.x eslint-plugin-standard@4.x
```
Then create a file named .eslintrc.json with following contents in the root folder of your project:
```javascript
module.exports = {
  extends: ['./node_modules/sdu-react-scripts/config/eslint'], 
}
```

### Ejecting from ESLint
You can add or overwrite the ESLint rules if you want to.
But if you totally wish to eject from `sdu-react-scripts` run `npx sdu-react-scripts eslint-eject`