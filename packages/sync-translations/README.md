# Translations

Helper script to sync translations of all locales with POEditor

⚠️ By default it will upload any new terms to POEditor, automatically translate the terms and then download the latest PO files from POEditor. If you only want to download from POEditor, use the flag [`--skip-new`]

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

- `--po-project-id`    
    the project id of PO Editor   


- `--po-api-token`    
    the API-token to access PO Editor


_optional_ parameters:
- `--locales` 
    Comma separated string with locales (default: `'nl-NL,en-GB'`)


- `--default-locale`  
    Locale to be used as the default source locale (default: `'nl-NL'`)


- `-s, --skip-new`  
   If you don't want to upload new terms to POEditor


## Example usage:

```bash
$ sdu-sync-translations --po-project-id=123456 --po-api-token=abc123xyz890 --locales=nl-NL,en-GB,fr-FR 
```
