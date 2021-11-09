const {
    override,
    addExternalBabelPlugins,
  } = require("customize-cra");
  
  module.exports = {
    webpack: override(
      ...addExternalBabelPlugins(
        "@babel/plugin-proposal-nullish-coalescing-operator"
      ),
    ),
  };