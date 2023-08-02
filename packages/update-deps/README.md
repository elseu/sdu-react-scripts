# Update Deps

Helper script to update dependencies in your package.json, by default it's set to `@elseu`-packages.

⚠️ By default it will only update the `dependencies` and `devDependencies` - if you want to have the `peerDependencies` updated as well, check the [--all](#with-peerdependencies)-flag

## Using sdu-react-scripts-update-deps package
For easily update your dependencies, install this package globally:

```
npm install @elseu/sdu-react-scripts-update-deps --global
```

Or add it to your project `package.json`:

```json
{
  "scripts": {
    "dev:deps": "sdu-deps"
  }
}
```

## Options
The tool makes use of the [Commander](https://www.npmjs.com/package/commander) package. To view the available options, run:

```bash
$ sdu-deps --help
```

### Only
`-o` or `--only`  
The package that only needs to be updated, others will be ignored  
For example:

`sdu-deps -osdu-titan` or `sdu-deps --only=@babel` - this would update `@elseu/sdu-titan` or `@babel`

💡you can "forget" adding the prefix `@elseu`, this will automagically be added if no package can be found with the provided name. So `--only=@elseu/sdu-titan` is the same as `--only=sdu-titan` 🤷‍♀️ 

### Prefix
`-p` or `--prefix`  
What prefix the packages should have, by default it's set to `@elseu` - but could also be something different.  
For example:

`sdu-deps -p@babel` or `sdu-deps --prefix=@babel` - this would update all the packages starting with `@babel`

### Stable only
`-s` or `--stable-only`
If the packages should only be updated to the latest stable versions, so will skip version with a prerelease-postfix.

### Dryrun
`-d` or `--dryrun`  
This will prevent the `package.json` be updated and only output the versions that **would be** changed.

### Silent
`--silent`  
Don't output any logging information

### With peerDependencies
`-a` or `--all`
This will **also** update the `peerDependencies`, by default these will be ignored. 
