/**
 *
 * Helper script to download all @elseu/sdu-titan package information and update it in the package.json
 *
 */
import chalk from 'chalk';
import { Command } from 'commander';
import jsonfile from 'jsonfile';

import { getPackageVersions } from './latestVersion/latestVersion';

const main = async (options: any) => {
  const { all, dryrun, prefix, silent, stableOnly } = options;

  const log = (message: string, error?: boolean) => (!silent || error) && console.log(message);

  // add a new line for readability ^^
  log('');

  // load package.json
  const packageJson = jsonfile.readFileSync('package.json');
  const changedPackages: string[] = [];

  let depsToUpdate = ['dependencies', 'devDependencies'];

  if (all) {
    depsToUpdate = [...depsToUpdate, 'peerDependencies'];
  }

  for (const depName of depsToUpdate) {
    log(`Processing ${chalk.greenBright(depName)} from package.json`);

    if (!packageJson[depName]) {
      log(`No package found in ${depName}\n`);
      continue;
    }

    // get all packages that start with the given prefix
    const allPackages = Object.keys(packageJson[depName]).filter((name) => name.startsWith(prefix));

    if (allPackages.length === 0) {
      log(
        `No packages found that start with "${chalk.magenta(prefix)}" in ${chalk.greenBright(
          depName,
        )}\n`,
      );
      continue;
    }

    const { output: versions } = await getPackageVersions(allPackages, log, !!stableOnly);

    if (!versions) {
      throw new Error('No version information to be parsed');
    }

    log('');

    versions.forEach((version, packageName) => {
      const currentVersionInPackageJson = packageJson[depName][packageName];

      // check if the version is different
      if (!currentVersionInPackageJson.endsWith(version)) {
        log(`Package           : ${chalk.magentaBright(packageName)}`);
        log(`Installed version : ${chalk.yellowBright(currentVersionInPackageJson)}`);
        log(`Updated to version: ${chalk.redBright(version)}`);

        packageJson[depName][packageName] = version;

        changedPackages.push(`${chalk.greenBright(depName)}: ${chalk.magentaBright(packageName)}`);
      } else {
        log(`Package           : ${chalk.cyan(packageName)}`);
        log(`Installed version : ${chalk.greenBright(currentVersionInPackageJson)}`);
      }

      log('');
    });
  }

  if (changedPackages.length > 0) {
    if (!dryrun) {
      log(`Changes were made in the package.json for: \n${changedPackages.join('\n')}`);
    }
  } else {
    log('No changes made to the package.json, all versions are up-to-date');
  }

  if (!dryrun) {
    jsonfile.writeFileSync('package.json', packageJson, { spaces: 2 });

    log('');
    log(
      chalk.blueBright(
        `Don't forget to run ${chalk.redBright(
          "'npm install'",
        )} to update the package-lock.json before committing`,
      ),
    );
  } else {
    log(`No updates written to 'package.json' due to the ${chalk.cyan('--dryrun')} flag`);
  }
};

const program = new Command();

program
  .description(
    "Tool to update the 'package.json' with the latest versions of the @elseu-packages in this package.json",
  )
  .option('--silent', 'Skip all the output, except errors.')
  .option('-a, --all', 'Also include peerDependencies')
  .option('-d, --dryrun', "Don't update the package.json, just output.")
  .option('-p, --prefix <prefix>', 'What packages to update', '@elseu')
  .option('-s, --stable-only', "Don't use development-versions, only latest stable")
  .action(main);

program.parse(process.argv);
