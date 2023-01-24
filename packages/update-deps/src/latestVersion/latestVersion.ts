// forked from https://github.com/patelvimal/latest-package-version

import chalk from 'chalk';

import { executeCommand } from './shellCommand';

export async function getPackageVersions(
  names: string[],
  log: (message: string, error?: boolean) => void,
): Promise<IPkgVersionResponse> {
  const versionInfo: Map<string, string> = new Map();

  const promises = names.map(async (pkg) => {
    log(`Fetching version package information (${chalk.magentaBright(pkg)})`);

    const versions = await executeCommand(`npm view ${pkg} versions`);

    if (versions) {
      const latestVersion = versions
        .replace('\n', '')
        // find the last tag, which is at the end of the versions string
        .match(/'(\d*\.\d*\.\d*(?:-\w*\.\d*)*)'\n*\s*]\n*\.*/);

      if (latestVersion) {
        const packageVersion = latestVersion[1];
        versionInfo.set(pkg, packageVersion);
      } else {
        log(`Error: no version found for: ${pkg}`, true);
      }
    } else {
      log(`Error: no version found for: ${pkg}`, true);
    }
  });

  return Promise.all(promises).then(
    () => {
      return {
        output: versionInfo,
        error: null,
      };
    },
    (error) => {
      return {
        output: null,
        error,
      };
    },
  );
}

interface IPkgVersionResponse {
  output: Map<string, string> | null;
  error: string | null;
}
