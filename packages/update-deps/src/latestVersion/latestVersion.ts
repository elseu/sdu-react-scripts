// forked from https://github.com/patelvimal/latest-package-version

import chalk from 'chalk';

import { executeCommand } from './shellCommand';

export async function getPackageVersions(
  names: string[],
  log: (message: string, error?: boolean) => void,
  stableOnly: boolean,
): Promise<IPkgVersionResponse> {
  const versionInfo: Map<string, string> = new Map();

  // prevent error about exit-listeners
  process.setMaxListeners(50);

  const promises = names.map(async (pkg) => {
    log(`Fetching version package information (${chalk.magentaBright(pkg)})`);

    let versions = await executeCommand(`npm view ${pkg} version${stableOnly ? '' : 's'}`);

    if (versions) {
      versions = versions.replace('\n', '');

      if (versions === '') {
        return;
      }

      if (stableOnly) {
        versionInfo.set(pkg, versions);
      } else {
        const allRegexpMatches = [
          ...versions
            // find the tags
            .matchAll(/'(\d*\.\d*\.\d*(?:-\w*\.\d*)*)'/g),
        ];

        const allVersions: string[] = [];

        allRegexpMatches.forEach((match) => {
          allVersions.push(match[1]);
        });

        if (allVersions.length === 0) {
          log(`Error: no version found for: ${pkg}`, true);
        }

        const latestVersion = allVersions.filter((v) => !v.includes('next') && !v.includes('test'));

        if (latestVersion.length) {
          versionInfo.set(pkg, latestVersion.pop()!);
        } else {
          log(`Error: no version found for: ${pkg}`, true);
        }
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
      console.error('Something went wrong while fetching the version information');

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
