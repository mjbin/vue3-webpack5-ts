const paths = require('./paths')
const { VueLoaderPlugin } = require('vue-loader')

const config = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: '@vue/runtime-dom',
      '@': paths.src
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
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
  plugins: [new VueLoaderPlugin()]
}

module.exports = config
