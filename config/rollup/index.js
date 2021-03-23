const commonjs = require.resolve('@rollup/plugin-commonjs');
const json = require.resolve('@rollup/plugin-json');
const resolve = require.resolve('@rollup/plugin-node-resolve');
const typescriptPlugin = require.resolve('@rollup/plugin-typescript');
const url = require.resolve('@rollup/plugin-url');
const externals = require.resolve('rollup-plugin-node-externals');

const dirname = (file) => {
  const [root, folder] = file.split('/');
  return `${root}/${folder}`;
};

function createDefaultRollupConfig(pkg) {
  return {
    input: pkg.source,
    output: [
      {
        dir: dirname(pkg.main),
        format: 'cjs',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
      {
        dir: dirname(pkg.module),
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    plugins: [
      externals({
        deps: true,
        peerDeps: true,
      }),
      url(),
      resolve(),
      json(),
      typescriptPlugin({
        exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
      }),
      commonjs(),
    ],
  };
}

module.exports = createDefaultRollupConfig;
