# Update Deps

Helper script to update dependencies in your package.json, by default it's set to `@elseu`-packages.

⚠️ By default it will only update the `dependencies` and `devDependencies` - if you want to have the `peerDependencies` updated as well, check the [--all](#with-peerdependencies)-flag

## Using sdu-react-scripts-update-deps package
The easiest method is to use `npx`:

```
npx @elseu/sdu-react-scripts-update-deps@latest
```

And maybe add an bash-alias for this in your terminal.

Or you could install this package globally:

```
npm install @elseu/sdu-react-scripts-update-deps --global
```

⚠️ Adding this package as a devDependency to your project is not recommended. Since you then will have *another* dependency to keep up to date.

## Options
The tool makes use of the [Commander](https://www.npmjs.com/package/commander) package. To view the available options, run:

```bash
$ sdu-deps --help
```

- [only](#only) : `-o`   
    useful to _only_ update one specific package  
    
  
- [prefix](#prefix) : `-p`  
    useful to update all packages starting with the same string
  

- [stable only](#stable-only) : `-s`  
    useful when releasing, when we only want to have stable versions 
  
  
- [dryrun](#dryrun) : `-d`  
    useful if you just want to check out what _would_ be updated
   
  
- [silent](#silent) : `--silent`  
    useful for when you don't want to make any noise
  

- [with peerDependencies](#with-peerdependencies) : `-a`  
    by default the peerDependencies won't be updated, this will enforce to have them included
  
---

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
