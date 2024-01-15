# Jest

## Extending Jest config

If you want to use this Jest configuration in a React project, you can install it with the following steps.

First, install this package by running `npm i @elseu/sdu-react-scripts-jest -D` .
Then, in the project root, create a file named `jest.config.js` with following contents:

```javascript
const baseConfig = require('@elseu/sdu-react-scripts-jest');

module.exports = {
  ...baseConfig,
  // here you can extend or override values from the base configuration
  // with project-specific values
};

```
