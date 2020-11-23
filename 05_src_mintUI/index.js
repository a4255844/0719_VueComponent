import Vue from 'vue/dist/vue.esm.js'
import App from './App'  //引入自定义组件
/* 
 注意： 引入的模块如果不带斜杠，它会默认寻找node_modules内寻找
        如果带斜杠，它会寻找当前目录的相对路径
*/
//注册全剧组件
// Vue.component('App', App)
//在Vue原型链上添加一个全局用于绑定事件监听和分发事件的vm实例对象=>公共的全局事件总线 (vm实例对象==组件对象)
// Vue.prototype.$globalEventBus = new Vue()
new Vue({
   // el: '#root',  两种指定标签的方式 el 和 .$mount('root')
   //注册局部组件
   beforeCreate() {
      Vue.prototype.$globalEventBus = this
   },
   components: {     //注册组件（后面才可以写组件标签）相当于确定组件的标签名,key可以自定义，value必须是引入的变量
      App: App
   },
   template: '<App/>'
}).$mount('#root')