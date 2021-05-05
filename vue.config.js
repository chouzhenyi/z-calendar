const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const MyWebpackPlugin = require('./zplugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: resolve('./src/entry-skeleton.js')
          }
        }
      }),
      new MyWebpackPlugin({
        config: {
          info: 'papa'
        }
      })
    ]
  }
}