module.exports = {
  extends: ['./node_modules/@elseu/sdu-react-scripts-eslint'],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
};
