#!/usr/bin/env node
const { program } = require('commander');

const { eslintEject } = require('../commands/eslint-eject');

const packageJson = require('../package.json');

program.version(packageJson.version);

program
  .command('eslint-eject')
  .description('Eject eslint config from sdu-react-scripts')
  .action(eslintEject);

program.parse(process.argv);
