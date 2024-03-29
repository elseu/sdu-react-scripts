#!/usr/bin/env node
const { program } = require('commander');

const { eslintEject } = require('../commands/eslint-eject');

const packageJson = require('../package.json');

program.version(packageJson.version);

program
  .command('eject')
  .description('Eject eslint config from @elseu/sdu-react-scripts/eslint')
  .action(eslintEject);

program.parse(process.argv);
