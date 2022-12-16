// forked from https://github.com/patelvimal/latest-package-version

import { executeCommand } from './shellCommand';

export function getPackageVersions(names: string[]): Promise<IPkgVersionResponse> {
  const versionInfo: Map<string, string> = new Map();

  // prevent 'Possible EventEmitter memory leak detected' notice
  process.setMaxListeners(names.length);

  const promises = names.map(async (pkg) => {
    let latestVersion = await executeCommand(`npm view ${pkg} version`);

    console.log('pkg : ', pkg);

    if (latestVersion) {
      latestVersion = latestVersion.replace('\n', '');

      console.log(`Latest version: ${latestVersion}`);
      versionInfo.set(pkg, latestVersion);
    } else {
      console.error(`NO VERSION FOUND FOR: ${pkg}`);
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
