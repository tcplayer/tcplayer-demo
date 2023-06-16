const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const yargs = require('yargs-parser');
const argv = yargs(process.argv.slice(2))

module.exports = function override(config, env) {
  config.output.publicPath = './';
  config.module.rules.push({
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
      minimize: false,
    },
  });
  config.plugins.push(new MonacoWebpackPlugin({
    languages: ['javascript']
  }));

  config.plugins.push(new webpack.DefinePlugin({
    CONFIGS: JSON.stringify(argv),
  }));

  return config;
}