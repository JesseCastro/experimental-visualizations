const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const DEV_BUCKET = process.env.npm_package_config_gcsDevBucket;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new ReplaceInFileWebpackPlugin([{
              dir: 'dist',
              files: ['manifest.json'],
              rules: [{
                  search: /YOUR_GCS_BUCKET/g,
                  replace: DEV_BUCKET
              },{
                  search: /DEVMODE_BOOL/g,
                  replace: 'true'
              }]
          }])
  ]
});
