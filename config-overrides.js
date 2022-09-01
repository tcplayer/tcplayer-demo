const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const lang = process.argv.splice(2)[0] || 'zh';

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
    LANGUAGE: JSON.stringify(lang),
  }));

  return config;
}