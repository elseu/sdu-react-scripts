# i18n

## Using lingui config

Install the dependencies

```bash
npm i @lingui/cli @lingui/core @lingui/macro @lingui/react -D
```

Create a `lingui.config.js` file in the root of your project

```typescript
import config from '@elseu/sdu-react-scripts-i18n';

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  ...config,
};
```
