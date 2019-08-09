const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parts = require("./webpack.parts");
const fs = require('fs')
const dir = require('node-dir')

let mode = ''
const folders = fs.readdirSync(`${__dirname}/src/pages`)
/**
 * 生成多文件入口
 * 遍历pages内所有文件夹，每个文件夹对应一个入口 
 */
function generateEntries(folders) {
  let entries = {}
  folders.forEach(folder => {
    let path = `${__dirname}/src/pages/${folder}`
    let stat = fs.lstatSync(path)
    if (stat.isDirectory() === true) {
      entries[folder] = `${path}/index.js`
    }
  })
  return entries
}

// 生成单个文件配置
function generateConfig(folder) {
  return {
    title: folder,
    filename: `${__dirname}/dist/${folder}.html`,
    template: `${__dirname}/src/pages/${folder}/index.tmpl.html`,
    chunks: [folder, `vendors~${folder}`],
    // minify: true, 不起作用，用下列方式替代即可
    minify: mode === 'production' ? {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    } : false
  }
}

/** 生成多页面 */
function generateHTMLs(folders) {
  let plugins = []
  folders.forEach(folder => {
    let path = `${__dirname}/src/pages/${folder}`
    let stat = fs.lstatSync(path)
    if (stat.isDirectory() === true) {
      let cfg = generateConfig(folder)
      plugins.push(new HtmlWebpackPlugin(cfg))
    }
  })
  return plugins
}
function commonConfig() {
  return merge({
    mode,
    // 生成多页面入口
    entry: generateEntries(folders),
    output: {
      path: __dirname + '/dist/',
      filename: mode === 'production' ? 'js/[name].[hash].bundle.js' : 'js/[name].bundle.js',
    },
    resolve: {
      alias: {
        '@component': path.resolve('../client/components'),
        '@util': path.resolve('../client/utils')
      }
    },
    plugins: [
      ...generateHTMLs(folders),
    ]
  },
    parts.clean(),
    parts.loadCSS(mode),
    parts.devtool(mode),
    parts.addBanner(),
    parts.addEslint(),
    parts.loadVue()
  )
};

function productionConfig() {
  return merge(
    parts.minifyJavaScript()
  )
}

function developmentConfig() {
  return merge(
    parts.devServer()
  )
}
/**
 * 如果要根据 webpack.config.js 中的 mode 变量更改打包行为，
 * 则必须将配置导出为一个函数，而不是导出为一个对象。
 */
module.exports = env => {
  console.log(env, '------------')
  mode = env;
  if (mode === "production") {
    return merge(commonConfig(), productionConfig());
  }
  return merge(commonConfig(), developmentConfig());
};