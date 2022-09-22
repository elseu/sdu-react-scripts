# Prettier

## Using prettier config

For formatting your code using the Prettier formatter. Using the Sdu Prettier configuration is simple: Reference the `@elseu/sdu-react-scripts-prettier` in your `package.json`:

```json
{
  "name": "@elseu/library-name",
  "version": "9000.0.1",
  "prettier": "@elseu/sdu-react-scripts-prettier"
}
```

If you don’t want to use `package.json`, you can extend in your own `prettierrc.json` or `prettierrc.js`.

> ```js
> module.exports = {
>   ...require('@elseu/sdu-react-scripts-prettier'),
> };
> ```

## Auto formatting with vsCode

To use autoformatting with VSCode you should install the [Prettier VSCode plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

To set the defaults, press `CMD + SHIFT + P` (on MacOS) or `CTRL + Shift + P` (on Windows), then type in preferences `open settings`.

In the JSON file, if it's not already added, add the following lines to the root of the object.

> ``` json
> // Default (format when you paste)
> "editor.formatOnPaste": true,
> // Default (format when you save)
> "editor.formatOnSave": true,
> ```
