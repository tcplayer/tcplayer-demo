const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  console.log('config', config);
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
  return config;
}