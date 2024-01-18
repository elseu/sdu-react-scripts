# Translations

Helper script to sync translations of all locales with POEditor

⚠️ By default it will upload any new terms to POEditor, automatically translate the terms and then download the latest PO files from POEditor. If you only want to download from POEditor, use the flag [--skipnew]

## Using sdu-react-scripts-update-deps package

The easiest method is to use `npx`:

```
npx @elseu/sdu-react-scripts-sync-translations
```

## Options

The tool makes use of the [Commander](https://www.npmjs.com/package/commander) package. To view the available options, run:

```bash
$ sdu-sync-translations --help
```

- [skipnew](#skipnew) : `-s`  
   If you don't want to upload new terms to POEditor

---
