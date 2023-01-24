# Update Deps

## Using sdu-react-scripts-update-deps package

For update your dependencies add `@elseu/sdu-react-scripts-update-deps` in your `scripts` array in the `package.json` file:

```json
{
  "scripts": {
    "dev:deps": "sdu-react-scripts-update-deps"
  }
}
```

## Options
The tool makes use of the [Commander](https://www.npmjs.com/package/commander) package. To view the available options, run:

```bash
$ npm run dev:deps -- --help
```

### Prefix
`-p` or `--prefix`  
What prefix the packages should have, by default it's set to `@elseu` - but could also be something different.  
For example:

`npm run dev:deps -- -p@babel` or `npm run dev:deps -- --prefix=@babel` - this would update all the packages starting with `@babel`

### Stable only
`-s` or `--stable-only`
If the packages should only be updated to the latest stable versions, so will skip version with a postfix

### Dryrun
`-d` or `--dryrun`  
This will prevent the `package.json` be updated and only output the versions that **would be** changed.

### Silent
`--silent`  
Don't output any logging information
