/* eslint-disable no-console */

import { Command } from '@commander-js/extra-typings';
import fs from 'fs';
import path from 'path';
import PO from 'pofile';
import request from 'request';

import type { POEditorLanguagesResult, POEditorResponse } from './types';

const program = new Command()
  .description('Tool to sync translations of all locales with POEditor')
  .requiredOption('--po-project-id <poid>', 'POEditor Project Id')
  .requiredOption('--po-api-token <api-token>', 'POEditor API Token')
  .option('--locales <locales>', 'Comma separated string with locales', 'nl-NL,en-GB')
  .option('--default-locale <locale>', 'Locale to be used as the default source locale', 'nl-NL')
  .option(
    '-s, --skip-new',
    "If you don't want to upload new terms to POEditor; Only download latest PO files from POEditor",
    false,
  )
  .parse(process.argv);

const constants = {
  POEDITOR_PROJECT_ID: program.opts().poProjectId,
  POEDITOR_API_TOKEN: program.opts().poApiToken,
  LOCALES: program.opts().locales,
  DEFAULT_LOCALE: program.opts().defaultLocale,
  SKIP_NEW: program.opts().skipNew,
};

const LOCALES = constants.LOCALES ? constants.LOCALES.split(',') : [constants.DEFAULT_LOCALE];
const BASE_URL = 'https://api.poeditor.com/v2';

function resolveFile(file: string) {
  const basePath = fs.realpathSync(process.cwd());
  return path.join(basePath, file);
}

function readPO(file: string): Promise<PO | null> {
  return new Promise((resolve) => {
    PO.load(file, (_err, po) => {
      resolve(po);
    });
  });
}

/** POEditor requires locales like nl-NL and it-IT to be nl and it, and nl-BE and en-GB to remain the same */
function getLocaleString(locale: string) {
  const [language, country] = locale.split('-');
  return language.toLowerCase() === country.toLocaleLowerCase() ? language.toLowerCase() : locale;
}

const getLanguages = async () => {
  const res = await fetch(`${BASE_URL}/languages/list`, {
    method: 'POST',
    body: new URLSearchParams({
      api_token: constants.POEDITOR_API_TOKEN,
      id: constants.POEDITOR_PROJECT_ID,
    }),
  });

  const data = (await res.json()) as POEditorResponse & POEditorLanguagesResult;
  return data.result?.languages;
};

const addTranslations = async () => {
  const file = resolveFile(`./src/translations/locales/${constants.DEFAULT_LOCALE}/messages.po`);

  try {
    if (!file) {
      throw new Error(`PO file does not exist: ${file}`);
    }

    const POFile = await readPO(file);

    if (!POFile) {
      throw new Error(`Could not read PO file: ${file}`);
    }

    const translations = POFile.items
      .filter((item) => !item.obsolete && !!item.msgstr[0])
      .map((item) => ({
        term: item.msgid,
        context: item.msgctxt,
        translation: {
          content: item.msgstr[0],
        },
      }));

    if (!translations.length) {
      // eslint-disable-next-line no-console
      console.log('No new translations found. Skipping...');
      return;
    }

    const sourceLanguage = constants.DEFAULT_LOCALE.split('-')[0];
    const locales = LOCALES.filter((locale) => locale.startsWith(sourceLanguage));

    for (const locale of locales) {
      try {
        const res = await fetch(`${BASE_URL}/translations/add`, {
          method: 'POST',
          body: new URLSearchParams({
            api_token: constants.POEDITOR_API_TOKEN,
            id: constants.POEDITOR_PROJECT_ID,
            language: getLocaleString(locale),
            data: JSON.stringify(translations),
          }),
        });

        const data = (await res.json()) as POEditorResponse & { result: any };

        if (data.response.status !== 'success') {
          throw new Error(data.response.message);
        }

        console.info(`Successfully added ${getLocaleString(locale)} translations`, data.result);
      } catch (error) {
        console.error(`Unable to add translations for locale ${locale}`, error);
      }
    }
  } catch (error) {
    console.error(`Unable to add translations`, error);
  }
};

const addTerms = async () => {
  const file = resolveFile(`./src/translations/locales/${constants.DEFAULT_LOCALE}/messages.po`);

  try {
    if (!file) {
      throw new Error(`PO file does not exist: ${file}`);
    }

    const POFile = await readPO(file);

    if (!POFile) {
      throw new Error(`Could not read PO file: ${file}`);
    }

    const messages = POFile.items
      .filter((item) => !item.obsolete)
      .map((item) => ({
        term: item.msgid,
        context: item.msgctxt,
        reference: item.references[0],
        plural: item.msgid_plural,
        comment: item.comments[0],
      }));

    if (!messages.length) {
      console.log('No new terms found. Skipping...');
      return;
    }

    const res = await fetch(`${BASE_URL}/terms/add`, {
      method: 'POST',
      body: new URLSearchParams({
        api_token: constants.POEDITOR_API_TOKEN,
        id: constants.POEDITOR_PROJECT_ID,
        data: JSON.stringify(messages),
      }),
    });

    const data = (await res.json()) as POEditorResponse & { result: any };

    if (data.response.status !== 'success') {
      throw new Error(data.response.message);
    }

    console.info(`Successfully updated terms`, data.result);
  } catch (error) {
    console.error(`Unable to update terms`, error);
  }
};

const syncTerms = async () => {
  for (const locale of LOCALES) {
    const filePath = resolveFile(`./src/translations/locales/${locale}/messages.po`);
    const localeString = getLocaleString(locale);

    try {
      const res = await fetch(`${BASE_URL}/projects/export`, {
        method: 'POST',
        body: new URLSearchParams({
          api_token: constants.POEDITOR_API_TOKEN,
          id: constants.POEDITOR_PROJECT_ID,
          language: localeString,
          type: 'po',
        }),
      });

      const data = (await res.json()) as POEditorResponse & { result?: { url: string } };
      if (!data.result?.url) {
        throw new Error('Missing download URL');
      }

      request(data.result.url).pipe(fs.createWriteStream(filePath));
      console.info(`Successfully synced locale ${locale}`);
    } catch (error) {
      console.error(`Unable to sync terms for locale ${locale}`, error);
    }
  }
};

const addLanguages = async () => {
  const existingLanguages = await getLanguages();

  for (const locale of LOCALES) {
    const localeString = getLocaleString(locale);

    if (
      existingLanguages?.find(
        (language) => language.code.toLowerCase() === localeString.toLowerCase(),
      )
    ) {
      console.info(`Locale ${locale} already exists as ${localeString}, skipping...`);
      continue;
    }

    try {
      const res = await fetch(`${BASE_URL}/languages/add`, {
        method: 'POST',
        body: new URLSearchParams({
          api_token: constants.POEDITOR_API_TOKEN,
          id: constants.POEDITOR_PROJECT_ID,
          language: localeString,
        }),
      });

      const response = (await res.json()) as POEditorResponse;
      if (response.response.status !== 'success') {
        throw new Error(response.response.message);
      }

      console.log(`Successfully added locale ${locale} as ${localeString}`);
    } catch (error) {
      console.error(`Unable to add locale ${locale} as ${localeString}`, error);
    }
  }
};

const autoTranslate = async () => {
  const languages = await getLanguages();
  if (!languages?.length) {
    return;
  }

  const includedLocales = [];
  const defaultLocale = constants.DEFAULT_LOCALE.split('-')[0];

  for (const language of languages.filter((lng) => !lng.code.startsWith(defaultLocale))) {
    if (language.percentage === 100) {
      console.log(
        `No untranslated terms found for ${language.code}. Skipping automatic translate...`,
      );
      continue;
    }
    includedLocales.push(language.code);
  }

  if (!includedLocales.length) {
    return;
  }

  const sourceLanguage = getLocaleString(constants.DEFAULT_LOCALE);

  const res = await fetch(`${BASE_URL}/translations/automatic`, {
    method: 'POST',
    body: new URLSearchParams({
      api_token: constants.POEDITOR_API_TOKEN,
      id: constants.POEDITOR_PROJECT_ID,
      source_language: sourceLanguage,
      provider_source_language: sourceLanguage,
      provider: 'google',
      target_languages: JSON.stringify(
        includedLocales.map((locale) => ({
          project_language: locale,
          provider_language: locale.split('-')[0],
        })),
      ),
      options: JSON.stringify({ format: 'html', tag_handling: 'html', formality: 'more' }),
    }),
  });

  const data = (await res.json()) as POEditorResponse & { result: any };
  console.info('Automatic translations done', data.result);
};

const sync = async () => {
  // add a new line for readability ^^
  console.log('');

  try {
    if (!constants.POEDITOR_PROJECT_ID || !constants.POEDITOR_API_TOKEN) {
      throw new Error(
        'Environment variables POEDITOR_PROJECT_ID and/or POEDITOR_API_TOKEN missing',
      );
    }

    if (!constants.DEFAULT_LOCALE) {
      throw new Error('Environment variable DEFAULT_LOCALE missing');
    }

    if (!constants.SKIP_NEW) {
      /** Add all new languages to POEditor */
      await addLanguages();

      /** Add all new terms to POEditor. Existing terms will not be overwritten */
      await addTerms();

      /** Add all source translations of new terms to POEditor. Existing translations will not be overwritten */
      await addTranslations();

      /** Automatically translate all new terms for all languages using DEFAULT_LOCALE as source */
      await autoTranslate();
    }

    /** Update local PO files with the catalogs on POEditor */
    await syncTerms();

    console.log('All done!');
  } catch (error) {
    console.log('POEditor sync failed', error);
    throw error;
  }
};

(async () => await sync())();
