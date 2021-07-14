const paths = require('./paths')
// const glob = require('glob')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const config = require('./webpack.common')

module.exports = merge(config, {
  entry: {
    app: `${paths.src}/entry-client.ts`
  },
  output: {
    filename: 'client/[name].[contenthash].js',
    path: paths.build,
    publicPath: '/'
    // library: {
    //   type: 'umd'
    // }
  },
  // devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`,
      filename: 'index.html',
      title: 'webpack5 + vue3 + ts',
      keywords: 'webpack5 + vue3 + ts',
      description: 'webpack5 + vue3 + ts',
      minify: {
        removeComments: false // 保留注释
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'client/css/[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${paths.src}/**/*`, { nodir: true })
    // }),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    })
  ],

  optimization: {
    runtimeChunk: 'single',
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors'
        }
      }
    },
    // usedExports: true,
    minimize: false
  }
})
