const paths = require('./paths')
const webpack = require('webpack')
const path = require('path')
// const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  mode: 'development',
  entry: `${paths.src}/entry-client.ts`,
  output: {
    filename: '[name].[contenthash].js',
    path: paths.build,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: '@vue/runtime-dom',
      '@': path.resolve(__dirname, '../src')
    }
  },

  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] } // fix：lang="ts"时VNode type报错
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf|jpg|png|svg|gif)([\?]?.*)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'client/assets/[hash].[ext]'
              }
            }
          }
        }
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
      env: 'env = { a: 123 }'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    })
  ],

  cache: true
}
