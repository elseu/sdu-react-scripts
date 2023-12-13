/**
 * Array of locale strings.
 * @type {string[]}
 */
const locales = ['fr-FR', 'nl-NL', 'en-GB', 'es-ES', 'it-IT', 'de-DE', 'nl-BE', 'fr-BE', 'dev'];

/**
 * List of locale objects with title and value properties.
 * @type {Array<{title: string, value: string}>}
 */
const localeList = [
  {
    title: 'Nederlands (Nederland)',
    value: 'nl-NL',
  },
  {
    title: 'Frans (Frankrijk)',
    value: 'fr-FR',
  },
  {
    title: 'Spaans (Spanje)',
    value: 'es-ES',
  },
  {
    title: 'Engels (Verenigd Koningkrijk)',
    value: 'en-GB',
  },
  {
    title: 'Italiaans (Italië)',
    value: 'it-IT',
  },
  {
    title: 'Duits (Duitsland)',
    value: 'de-DE',
  },
  {
    title: 'Frans (België)',
    value: 'fr-BE',
  },
  {
    title: 'Nederlands (België)',
    value: 'nl-BE',
  },
  {
    title: 'Development',
    value: 'dev',
  },
];

/**
 * Configuration object for the module.
 * @type {{
 *   config: import('@lingui/conf').LinguiConfig,
 *   localeList: Array<{title: string, value: string}>
 * }}
 */
const moduleConfig = {
  config: {
    locales,
    sourceLocale: 'nl-NL',
    pseudoLocale: 'dev',
    fallbackLocales: {
      default: 'nl-NL',
    },
    catalogs: [
      {
        path: '<rootDir>/src/locales/{locale}/messages',
        include: ['<rootDir>/src'],
        exclude: ['**/node_modules/**'],
      },
    ],
    format: 'po',
  },
  localeList,
};

module.exports = moduleConfig;
