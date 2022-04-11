const declare = require('@babel/helper-plugin-utils').declare;
const annotateAsPure = require('@babel/helper-annotate-as-pure').default;
const t = require('@babel/core').types;

// Mapping of sdu-titan top-level methods that are pure.
// This plugin adds a /*#__PURE__#/ annotation to calls to these methods,
// so that terser and other minifiers can safely remove them during dead
// code elimination.
const PURE_CALLS = new Map([['withTitan']]);

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'transform-custom-pure-annotations',
    visitor: {
      CallExpression(path) {
        if (isReactCall(path)) {
          annotateAsPure(path);
        }
      },
    },
  };
});

function isReactCall(path) {
  if (!t.isMemberExpression(path.node.callee)) {
    const callee = path.get('callee');
    if (PURE_CALLS.has(callee.node.name)) {
      return true;
    }

    return false;
  }

  for (const [module, methods] of PURE_CALLS) {
    const object = path.get('callee.object');
    if (
      object.referencesImport(module, 'default') ||
      object.referencesImport(module, '*')
    ) {
      for (const method of methods) {
        if (t.isIdentifier(path.node.callee.property, { name: method })) {
          return true;
        }
      }

      return false;
    }
  }

  return false;
}
