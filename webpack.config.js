const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = { //配置对象
   // 1. 模式
   // mode: 'production',
   // 2. 入口
   entry: {
      xxx: path.resolve(__dirname, 'src/index.js')
   },
   // 3.出口
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'static/js/[name].bundle.js'  //可以带路径
   },
   // 4.loader模块加载器
   module: {
      rules: [
         //ES6==>ES5的loader
         {
            test: /\.m?js$/,    //用于匹配文件(对那些文件进行处理)
            // exclude: /node_modules/, //排除打包的位置
            include: path.resolve(__dirname, 'src'), //指定打包的具体位置(针对此位置内的文件)
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'], //预设包：包含多个常用插件包的一个大包
                  // plugins: []          //可以添加需要依赖的包
               }
            }
         },
         //处理CSS文件
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],    //顺序不能变，从右往左依次执行
         },
         //打包图片
         {
            test: /\.(png|jpg|gif)$/i,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8192,   //配置beas64的大小
                     name: 'static/img/[name].[hash:7].[ext]'  //相对于output.path
                  },
               },
            ],
         },
      ]
   },
   // 5.插件
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',   //将哪个页面作为模板页面处理（在根目录查找）
         filename: 'index.html'   //生成页面(在butput指定的path下)
      })
   ],
   //配置开发服务器
   devServer: {
      open: true, // 自动打开浏览器
      quiet: true, // 不做太多日志输出
   },
   // 配置开启source-map调试
   devtool: 'cheap-module-eval-source-map',
}
/*
  weback直接运行必须全局安装加局部安转
  如果只局部安装，可以使用 npx weback,或在package.json内配置:
   "script" : {
       "build" : "webpack --mode production"
   }
*/