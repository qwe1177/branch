const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除编译文件
// console.log("process.env.NODE_ENV="+process.env.NODE_ENV );
const NODE_ENV = process.env.NODE_ENV || 'development'



const vendors=[
  'babel-polyfill', //ie9以及以上浏览量中支持promise等异步流程处理API
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-thunk',
  'axios',
  'lodash',
  'antd'
];

//var  entries = getEntries('src/**/index.js');  //编译所有页面
var  entries = getEntries('src/suppliermanage/allsupplierdetail/index.js');  //编译某个页面
// var  entries = getEntries('src/home/srm/index.js');  //编译某个页面

entries.push(getEntries('src/home/srm/index.js')[0]);  //编译首页
entries.push(getEntries('src/suppliermanage/pubilcsupplier/index.js')[0]);  //编译首页

const __DEV__ = NODE_ENV === 'development';
const __TEST__ = NODE_ENV === 'test';
const __PROD__ = NODE_ENV === 'production';
const conftilte = config.title;
const extractCSS=new ExtractTextPlugin(__PROD__?"statics/css/[name].[chunkhash:6].css":"[name].[chunkhash:6].css");

const webpackConfig = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],//为了减少搜索我们直接写明node_modules的全路径
   // mainFields: ['jsnext:main','main']            //这样就可以优化支持tree-shaking的库 ,部分库更新导致找不到文件，暂停这个优化
  }, 
  entry: {},
  output:{
    path:path.resolve(__dirname, './build/'),
    publicPath: '/',
    filename:__PROD__?'statics/js/[name].[chunkhash:6].js':'[name].[chunkhash:6].js'
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    inline: true,
    port: 8181,
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        pathRewrite: {"^/api" : ""}
      }
    }
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        exclude:/node_modules/,
        include: [
          // 只去解析运行目录下的 src
          path.resolve(__dirname, "src")
        ],
        use: [{
          loader: 'babel-loader?cacheDirectory=true'
        }]
      },
      {
        test: /\.(scss|sass|css)$/, 
        loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
        // 图片加载器，较小的图片转成base64
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: __PROD__?'statics/images/[name].[ext]?[hash:7]':'[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'], // 公共模块的名称
      //chunks: '',  // chunks是需要提取的模块
      minChunks: entries.length
    }),
    //提取样式
    extractCSS
  ],
};
 
webpackConfig.entry['vendors'] = vendors; //公共文件分包为vendor
//生产环境
if (__PROD__) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new CleanWebpackPlugin(['build'],　 
    {
      root: __dirname,    　　　　　　　　　　
      verbose: true,    　　　　　　　　　　
      dry:   false    　　　　　　　　　　
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]);
}

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath);
  const reg =/(reducers|actions|sagas)/; //过滤掉redux结构目录中的index.js
  return files.filter((i)=>!reg.test(i))
}

entries.forEach(function(name) {
  const path =  name.replace(/^src\/(.*\/).*$/g, '$1');
  const newname = name.replace(/^src\/(.*)\/.*$/g, '$1').replace(/\//g, '-');
  webpackConfig.entry[newname] = './'+name;
  const plugin = new HtmlWebpackPlugin({
	  title:conftilte[newname]||'srm',
    filename: path + 'index.html',
    template: './src/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: ['manifest','vendors',newname]
  });
  webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;
