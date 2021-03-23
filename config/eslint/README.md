# ESLint

## Extending ESLint
If you want to use this ESLint configuration in a React project, you can install it with the following steps.

First, install this package by running `npm i sdu-react-scripts -D` .
Then install ESLint and the necessary plugins. Just copy this line and paste in your terminal.
```
npm install --save-dev eslint
```
Then create a file named .eslintrc.json with following contents in the root folder of your project:
```javascript
module.exports = {
  extends: ['./node_modules/sdu-react-scripts/config/eslint'], 
}
```

## Ejecting from ESLint
You can add or overwrite the ESLint rules if you want to.
But if you totally wish to eject from `sdu-react-scripts` run `npx sdu-react-scripts eslint-eject`