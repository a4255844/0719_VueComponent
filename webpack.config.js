const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
      filename: 'static/js/[name].bundle.js',  //可以带路径
      publicPath: '/'    // 引入打包的文件时路径以/开头
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
                  presets: [
                     ['@babel/preset-env', {
                        useBuiltIns: 'usage',
                        'corejs': 2
                     }]
                  ], //预设包：包含多个常用插件包的一个大包
                  plugins: [["babel-plugin-component",
                     {
                        "libraryName": "mint-ui",  //针对mint-ui库实现按需引入打包
                        "style": true        //自动打包对应的css
                     }
                  ]]
               }
            }
         },
         //处理CSS文件
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
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
         {
            test: /\.vue$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'vue-loader'
         }
      ]
   },
   // 5.插件
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',   //将哪个页面作为模板页面处理（在根目录查找）
         filename: 'index.html'   //生成页面(在output指定的path下)
      }),
      new VueLoaderPlugin()
   ],

   //配置开发服务器
   devServer: {
      port: 8080,
      open: true, // 自动打开浏览器
      // quiet: true, // 不做太多日志输出
      proxy: { //解决跨越
         //处理以api开头路径的请求
         // "/api" : http://localhost:4000  http://localhost:4000/api/search/users
         '/api': {
            target: 'http://localhost:4000',  //转发目标地址
            pathRewrite: {
               '^/api': '' //转发请求时去除路径前面的/api
            },
            changeOrigin: true   //支持跨域，如果协议/主机也不相同，必须加上
         }
      },
      historyApiFallback: true,  //任意的404错误响应都被替换为 index.html
   },
   /* 
   1. 请求的路径有对应的资源
      http://localhost:8080/ ==> index.html
      http://localhost:8000/static/css/base.css ===> base.css
   2. 请求的路径与代理服务器监视的路径匹配
      由代理服务器转发请求，得到资源后返回
   3. 其他所有的请求（404）
      返回index页面，请求的path部分会被当做前台路由来处理
   */

   // 配置开启source-map调试
   devtool: 'cheap-module-eval-source-map',

   // 引入模块的解析
   resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: { // 路径别名(简写方式)
         'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配 from vue = from vue/dist/vue.esm.js
         '@': path.resolve(__dirname, 'src') //以@表示当前项目的src目录
      }
   }


}
/*
  weback直接运行必须全局安装加局部安转
  如果只局部安装，可以使用 npx weback,或在package.json内配置:
   "script" : {
       "build" : "webpack --mode production"
   }
*/