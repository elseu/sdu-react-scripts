const locales = ['fr-FR', 'nl-NL', 'en-GB', 'es-ES', 'it-IT', 'de-DE', 'nl-BE', 'fr-BE', 'dev'];

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

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales,
  localeList,
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
};
