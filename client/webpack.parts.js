const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require("clean-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

exports.devServer = () => ({
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    compress: true,
    open: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});

exports.devtool = (mode) => ({
  devtool: mode === "production" ? false : 'eval-source-map'
});

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
});

exports.loadCSS = (mode) => ({
  optimization: {
    minimizer: mode === 'production' ? [new OptimizeCSSAssetsPlugin({})] : []
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // {
          //     loader: 'vue-style-loader'
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              localIdentName: '[name]-[local]-[hash:base64:5]'
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: mode === 'production' ? "css/[name].[hash].css" : "css/[name].css",
      chunkFilename: "[id].css"
    })
  ]
});

exports.loadVue = () => ({
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
});

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.addBanner = (text = '版权所有，翻版必究') => ({
  plugins: [new webpack.BannerPlugin(text)]
});

exports.addEslint = () => {
  return {
    module: {
      rules: [{
        enforce: "pre", // 强制优先检查
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true, // 自动修复错误
          cache: true
        }
      }]
    }
  }
}

exports.loadFont = () => {
  {
    module: {
      rules: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        }
      ]
    }
  }
}

exports.copyStatic = () => {
  return {
    context: path.resolve('./'),
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve('./src/static'),
        ignore: ['.*']
      }])
    ]
  }
}