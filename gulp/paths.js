const path = require('path');
const projectDir = path.resolve(__dirname, '../');
const outputDir = `${projectDir}/build`;

module.exports = {
  output: outputDir,
  outputStyles: `${outputDir}/assets/stylesheets`,
  outputImages: `${outputDir}/assets/images`,
  outputJS: `${outputDir}/assets/javascripts`,
  outputFonts: `${outputDir}/assets/fonts`,
  sourceStyles: `${projectDir}/assets/stylesheets`,
  sourceImages: `${projectDir}/assets/images`,
  sourceJS: `${projectDir}/assets/javascripts`,
  sourceFonts: `${projectDir}/assets/fonts`,
  sourceApp: `${projectDir}/app`,
  sourceViews: `${projectDir}/app/views`,
  webpackConfig: `${projectDir}/webpack.config.js`,
  nodeModules: `${projectDir}/node_modules`,
  projectDir,
};
