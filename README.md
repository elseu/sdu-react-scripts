# sdu-react-scripts
Generic script and config for your next @elseu React project

## Contents
- [Eslint Config](/config/eslint/index.js)

## Installation
`npm install -D sdu-react-scripts`

## Features

### Extending ESLint
You can use the ESLint config by extending it in an `.eslintrc.js` file like this:

```javascript
module.exports = {
  extends: ['sdu-react-scripts/config/eslint'],
}
```

### Ejecting from ESLint
You can add or overwrite the ESLint rules if you want to.
If you totally wish to eject from `sdu-react-scripts` run `npx sdu-react-scripts eslint-eject`