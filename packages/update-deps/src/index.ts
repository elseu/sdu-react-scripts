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

  let hasChanges = false;

  if (!versions) {
    throw new Error('No version information to be parsed');
  }

  // add a new line for readability ^^
  console.log('');

  versions.forEach((version, packageName) => {
    // check if the version is different
    if (!packageJson.dependencies[packageName].endsWith(version)) {
      console.log(`Set ${packageName} to ${version} in package.json`);

      packageJson.dependencies[packageName] = version;

      hasChanges = true;
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!hasChanges) {
    console.log('No changes made to the package.json, all versions are up-to-date');
  }

  jsonfile.writeFileSync('package.json', packageJson, { spaces: 2 });
};

main();
