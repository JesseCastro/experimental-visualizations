const path = require('path');
const program = require('commander');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const DEV_BUCKET = process.env.npm_package_config_gcsDevBucket;
const PROD_BUCKET = process.env.npm_package_config_gcsProdBucket;
const CSS_FILE = process.env.npm_package_config_cssFile
const MANIFEST_FILE = process.env.npm_package_config_manifestFile;
const JS_FILE = process.env.npm_package_config_jsFile;
const JSON_FILE = process.env.npm_package_config_jsonFile;

module.exports = {
  // this is our main js code
  entry: path.resolve(__dirname, '../src', JS_FILE),
  output: {
    // this is our main processed js code (along with dependent libraries)
    filename: JS_FILE,
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {from: './src/' + MANIFEST_FILE,to: './'},
        {from: './src/' + JSON_FILE,to: './'},
        {from: './src/' + CSS_FILE,to: './'}
      ]
    )
  ]
};
