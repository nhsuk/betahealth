const path = require('path');

const projectDir = path.resolve(__dirname, '../');
const tempDir = `${projectDir}/.tmp`;

module.exports = {
  build: `${projectDir}/build`,
  output: tempDir,
  outputStyles: `${tempDir}/assets/stylesheets`,
  outputImages: `${tempDir}/assets/images`,
  outputJS: `${tempDir}/assets/javascripts`,
  outputFonts: `${tempDir}/assets/fonts`,
  sourceStyles: `${projectDir}/assets/stylesheets`,
  sourceImages: `${projectDir}/assets/images`,
  sourceJS: `${projectDir}/assets/javascripts`,
  sourceFonts: `${projectDir}/assets/fonts`,
  sourceApp: `${projectDir}/app`,
  sourceViews: `${projectDir}/app/views`,
  webpackConfig: `${projectDir}/webpack.config.js`,
  webpackProductionConfig: `${projectDir}/webpack.config.prod.js`,
  nodeModules: `${projectDir}/node_modules`,
  projectDir,
};
