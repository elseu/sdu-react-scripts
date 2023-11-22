# Prettier

## Using prettier config

For formatting your code using the Prettier formatter. Using the Sdu Prettier configuration is simple: Reference the `@elseu/sdu-react-scripts-prettier` in your `package.json`:

> ```json
> {
>  "name": "@elseu/library-name",
>  "version": "9000.0.1",
>  "prettier": "@elseu/sdu-react-scripts-prettier"
> }
> ```

If you don’t want to use `package.json`, you can extend in your own `prettierrc.json` or `prettierrc.js`.

> ```js
> module.exports = {
>   ...require('@elseu/sdu-react-scripts-prettier'),
> };
> ```

## Using prettier together with eslint

Install `eslint-plugin-prettier` as a dev dependency and add the following properties to the `.eslintrc`:

> ``` json
> {
>   "plugins": ["prettier"],
>   "overrides": [
>     {
>       "files": ["*.ts", "*.tsx"], // Your TypeScript files extension
>       "parserOptions": {
>         "project": ["./tsconfig.json"] // Specify it only for TypeScript files
>       }
>     }
>   ],
>   "rules": {
>     "prettier/prettier": ["error"]
>   }
> }
> ```

## Auto formatting with vsCode

To use autoformatting with VSCode you should install the [Prettier VSCode plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Add the following content to `.vscode/settings.json`
> ``` json
> {
>  "[typescriptreact]": {
>   "editor.defaultFormatter": "dbaeumer.vscode-eslint"
>  },
>  "editor.defaultFormatter": "esbenp.prettier-vscode",
>  "editor.codeActionsOnSave": {
>   "source.fixAll.eslint": true
>  },
>  "editor.formatOnPaste": true,
>  "editor.formatOnSave": true,
>  "eslint.format.enable": true
> }
> ```
