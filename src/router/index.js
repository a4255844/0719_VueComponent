/* 路由器对象模块 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/pages/About'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import MessageDetail from '@/pages/MessageDetail'
/* 声明使用vue插件 */
Vue.use(VueRouter)

export default new VueRouter({
   mode: 'history', //去掉路由路径中的#,需要在配置webpack
   /* 应用中所有路由 */
   routes: [
      /* 单个路由对象 */
      {
         path: '/about',
         component: About
      },
      {
         path: '/home',
         component: Home,
         children: [  //注册子路由
            {
               path: '/home/news',
               component: News
            },
            {
               path: 'message',  //相当于 '/home/message'
               component: Message,
               children: [
                  {
                     name: 'detail',  //路由组件的标识
                     path: '/home/message/detail/:id',  //动态路由： :id是占位符，用于接收params参数
                     component: MessageDetail,
                     // props: true,  // 内部自动将接收的parmas参数以标签属性传入路由组件
                     // 函数返回的对象中的所有属性都会以标签属性传入路由组件，相对灵活，可以传query参数
                     props: route => ({ id: route.params.id, name: route.query.name })
                  }
               ]
            }
         ]
      },
      /* 自定义自动重定向的路由 */
      {
         path: '/',
         redirect: '/about'
      }
   ]
})