const paths = require('./paths')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const WebpackNodeExternals = require('webpack-node-externals')
const config = require('./webpack.common')

module.exports = merge(config, {
  entry: `${paths.src}/entry-server.ts`,
  target: 'node',
  output: {
    filename: 'server/server.bundle.js',
    path: paths.build,
    publicPath: '/',
    library: {
      type: 'commonjs2'
    }
  },

  externals: WebpackNodeExternals({
    allowlist: /\.(css|vue)([\?]?.*)$/
  }),

  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: ['ignore-loader']
      }
    ]
  },

  plugins: [
    new WebpackManifestPlugin(), // 生成manifest
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    })
  ],

  optimization: {
    splitChunks: false,
    minimize: false
  }
})
