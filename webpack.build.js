/*
 strip-loader的作用可以将任意的函数里代码中剥离出去。
 比如： loader: WebpackStripLoader.loader('console.log') 含义是把 console.log 代码剥离出去，打包的时候不会打包进去。
*/
var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');
var webpack = require('webpack');
var version = process.env.VERSION || require('./package.json').version;

var banner =
  'vue-calendar v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' tugenhua0707@qq.com \n' +
  '@license MIT'

var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
};

devConfig.module.loaders.push(stripLoader);

devConfig.entry = './src/index.js';

devConfig.output = {
  path:'./dist',
  filename:'vue-calendar.js',
  library:'Vuecalendar',
  libraryTarget: 'umd'
};
devConfig.plugins = devConfig.plugins.concat([
  new webpack.BannerPlugin(banner)
]);
module.exports = devConfig;
