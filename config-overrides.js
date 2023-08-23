const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack');
// const lang = (process && process.argv.splice(2)[0]) || 'zh';
const lang = 'en';

module.exports = function override(config, env) {
  config.output.publicPath = './';
  config.module.rules.push({
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
      minimize: false,
    },
  });

  // config.plugins.push(new BundleAnalyzerPlugin({
    
  // }));
  config.plugins.push(new MonacoWebpackPlugin({
    languages: ['javascript']
  }));

  

  config.plugins.push(new webpack.DefinePlugin({
    LANGUAGE: JSON.stringify(lang),
  }));

  return config;
}