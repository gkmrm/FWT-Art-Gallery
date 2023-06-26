/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = (config) => {
  const overrider = alias(configPaths('./tsconfig.paths.json'));
  return overrider(config);
};
