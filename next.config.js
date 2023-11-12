const { PHASE_DEVELOPMENT_SERVER } = require('next/constants.js');
const { repository } = require('./package.json');

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

/**
 * @param {string} stage
 */
module.exports = function next(stage) {
  return defineNextConfig({
    distDir: stage == PHASE_DEVELOPMENT_SERVER ? '.next' : 'build',
    swcMinify: true,
    productionBrowserSourceMaps: true,
    experimental: {
      fallbackNodePolyfills: false,
    },
    publicRuntimeConfig: {
      repository,
    },
    webpack(config) {
      config.experiments.topLevelAwait = true;
      return config;
    },
  });
};
