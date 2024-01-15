#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

(async () => {
  prompt.start();

  let { packageName } = await prompt.get([
    {
      name: 'packageName',
      description: 'What @elseu/package do you want to have linked? @elseu/...',
      required: true,
    },
  ]);
  packageName = packageName.replace(/@?elseu\//, '');

  // check if package exists
  const packagePath = path.resolve('node_modules', '@elseu', packageName);

  if (!fs.existsSync(packagePath)) {
    console.error(
      `${packageName} is non-existing package. Install using npm install first before running setup`,
    );

    process.exit();
  }

  const packageDistPath = path.resolve(packagePath, 'dist');

  if (!fs.existsSync(packageDistPath)) {
    console.error(`${packageName} has no dist-folder. We don't know what to symlink.`);

    process.exit();
  }

  // check if symlink exists
  fs.lstat(packageDistPath, async function (err, stats) {
    if (err) {
      console.error(err);
      process.exit();
    }

    if (stats.isSymbolicLink()) {
      console.log('Symlink already exists, no further actions needed.');
      process.exit();
    }

    console.log("No symlink exists, so let's create it");

    // check if source directory exists, otherwise ask
    let targetSymlinkPath = path.resolve('..', packageName, 'dist');

    console.log(`Check if assumed path exist: ${targetSymlinkPath}`);
    while (!fs.existsSync(targetSymlinkPath)) {
      console.log(
        `${targetSymlinkPath} does not exist. Please provide a relative path to the directory where to symlink to.`,
      );

      const { requestedTargetPath } = await prompt.get([
        {
          name: 'requestedTargetPath',
          description: 'What is the relative path to the local package directory?',
          required: true,
        },
      ]);

      targetSymlinkPath = path.resolve(requestedTargetPath, 'dist');
    }

    // rename existing dist-folder
    fs.renameSync(packageDistPath, path.resolve(packagePath, 'dist--old'));
    console.log('Existing dist directory successfully renamed to dist--old');

    // create symlink
    fs.symlinkSync(targetSymlinkPath, packageDistPath);
    console.log(`Symlink to ${targetSymlinkPath} created`);
  });
})();
