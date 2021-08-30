const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
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
  return config;
}