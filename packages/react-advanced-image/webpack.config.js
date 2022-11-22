Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const package = require('./package.json');
const buildConfig = require('@codification/cutwater-build-web').getConfig();

const webpackConfiguration = (env, options) => {
  return {
    mode: 'production',
    entry: {
      'react-advanced-image': path.join(__dirname, buildConfig.srcFolder, 'index.ts')
    },
    output: {
      libraryTarget: 'umd',
      publicPath: '/',
      filename: '[name].min.js',
      path: path.join(__dirname, buildConfig.distFolder)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: ['react'],
          amd: 'React',
        }
      },
      {
        "react-dom": {
          root: 'ReactDom',
          commonjs2: 'react-dom',
          commonjs: ['react-dom'],
          amd: 'ReactDom',
        }
      }
    ]
  };
};
module.exports = webpackConfiguration;
