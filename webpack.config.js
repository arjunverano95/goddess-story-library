const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@rneui/base', '@rneui/themed'],
      },
    },
    argv,
  );
  // Customize the config before returning it.
  return config;
};
