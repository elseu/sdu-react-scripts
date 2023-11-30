# i18n

## Using lingui config

Install the dependencies

```bash
npm i @lingui/cli @lingui/core @lingui/macro @lingui/react -D
```

Create a `lingui.config.js` file in the root of your project

```typescript
import { config } from '@elseu/sdu-react-scripts-i18n';

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  ...config,
};
```

Create npm scripts in `package.json`

```
"translations:extract": "lingui extract",
"translations:compile": "lingui compile",
"translations": "npm run translations:extract && npm run translations:compile"
```
