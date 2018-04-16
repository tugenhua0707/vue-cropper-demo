
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry:'./demo/main.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    publichPath : '/static/',
    filename:'bundle.js'
  },
  plugins : [
    /*
     ProvidePlugin 是webpack内置的模块，使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入。
     比如如下以 jquery为例，用 ProvidePlugin进行实例初始化后，jquery就会自动加载并导入对应的node模块中。
     new webpack.ProvidePlugin({
       $ : 'jquery',
       jQuery: 'jquery'
     });
     然后我们在代码中可以直接使用
     $('.XXX');
    */
    new webpack.ProvidePlugin({
      Promise : 'es6-promise'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src' : path.resolve(__dirname, './src'),
      'dist' : path.resolve(__dirname, './dist')
    }
  },
  module: {
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel?presets[]=es2015'
      },
      {
        test:/\.vue$/,
        loader:'vue'
      },
      {
        test:/\.styl$/,
        loader:'style!css!stylus!sass'
      },
      {
        test:/\.css$/,
        loader:'style!css'
      }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['> 1%']
    },
    loaders: {
      stylus: 'style!css!stylus!sass'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devServer: {
    port : 8877,
    historyApiFallback: true,
    stats : {
      colors : true,
      chunks : false
    }
  }
};