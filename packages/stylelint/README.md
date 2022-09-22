# Stylelint

## Using Stylelint config

For linting your CSS with the `stylelint` CSS linter. Using the Sdu Stylelint configuration is simple: Reference the `@elseu/sdu-react-scripts-prettier` in your `package.json`:

```json
{
  "name": "@elseu/library-name",
  "version": "9000.0.1",
  "prettier": "@elseu/sdu-react-scripts-prettier"
}
```

If you don’t want to use `package.json`, you can extend in your own `prettierrc.json` or `prettierrc.js`.

> ```json
> {
>  "extends": "@elseu/sdu-react-scripts-stylelint"
> }
> ```