/**
 *
 * Helper script to download all @elseu/sdu-titan package information and update it in the package.json
 *
 */
import chalk from 'chalk';
import jsonfile from 'jsonfile';

import { getPackageVersions } from './latestVersion/latestVersion';

const main = async () => {
  // load package.json
  const packageJson = jsonfile.readFileSync('package.json');

  // get all @elseu-packages
  const allElseuPackages = Object.keys(packageJson.dependencies).filter((name) =>
    name.startsWith('@elseu'),
  );

  const { output: versions } = await getPackageVersions(allElseuPackages);

  const changedPackages: string[] = [];

  if (!versions) {
    throw new Error('No version information to be parsed');
  }

  // add a new line for readability ^^
  console.log('');

  versions.forEach((version, packageName) => {
    const currentVersionInPackageJson = packageJson.dependencies[packageName];

    // check if the version is different
    if (!currentVersionInPackageJson.endsWith(version)) {
      console.log(`Package           : ${chalk.magentaBright(packageName)}`);
      console.log(`Installed version : ${chalk.yellowBright(currentVersionInPackageJson)}`);
      console.log(`Updated to version: ${chalk.redBright(version)}`);

      packageJson.dependencies[packageName] = version;

      changedPackages.push(packageName);
    } else {
      console.log(`Package           : ${chalk.cyan(packageName)}`);
      console.log(`Installed version : ${chalk.greenBright(currentVersionInPackageJson)}`);
    }

    console.log('');
  });

  if (changedPackages.length > 0) {
    console.log(
      `Changes were made in the package.json for: \n${chalk.magenta(changedPackages.join('\n'))}`,
    );
  } else {
    console.log('No changes made to the package.json, all versions are up-to-date');
  }

  jsonfile.writeFileSync('package.json', packageJson, { spaces: 2 });
};

main();
