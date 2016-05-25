const path = require('path');
const projectDir = path.resolve(__dirname, '../');
const outputDir = `${projectDir}/build`;

module.exports = {
  output: outputDir,
  outputStyles: `${outputDir}/stylesheets`,
  outputImages: `${outputDir}/images`,
  outputJS: `${outputDir}/javascripts`,
  sourceStyles: `${projectDir}/assets/stylesheets`,
  sourceImages: `${projectDir}/assets/images`,
  sourceJS: `${projectDir}/assets/javascripts`,
  sourceApp: `${projectDir}/app`,
  sourceViews: `${projectDir}/app/views`,
  webpackConfig: `${projectDir}/webpack.config.js`,
  nodeModules: `${projectDir}/node_modules`,
  projectDir,
};
