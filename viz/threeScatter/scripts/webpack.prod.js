const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const PROD_BUCKET = process.env.npm_package_config_gcsProdBucket;

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  plugins: [
    new ReplaceInFileWebpackPlugin([{
              dir: 'dist',
              files: ['manifest.json'],
              rules: [{
                  search: /YOUR_GCS_BUCKET/g,
                  replace: PROD_BUCKET
              },{
                  search: /DEVMODE_BOOL/g,
                  replace: 'false'
              }]
          }])
  ]
});
