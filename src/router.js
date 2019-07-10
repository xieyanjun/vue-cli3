import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router= new Router({
  mode: 'history',
  base: "/main/",
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      children:[{
        path: '1-1',
        name: 'Main1',
        component: resolve => require(["@/components/Main1.vue"], resolve) //懒加载， require方式引入，会将components分别打包成不同的js,加载的时候也是按需加载，只会在访问到这个路由时才会加载这个js，异步组件技术，这种方法可以实现按需加载
      },{
        path: '1-2',
        name: 'Main2',
      component: () => import('@/components/Main2.vue') //按需加载，不是异步
      },{
        path: '1-3',
        name: 'Main3',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main3.vue')
      },
      {
        path: '2-1',
        name: 'Main1',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main1.vue')
      },{
        path: '2-2',
        name: 'Main2',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main2.vue')
      },{
        path: '2-3',
        name: 'Main3',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main3.vue')
      },
      // {
      //   path: "",
      //   redirect: "main"
      // }
    ]
    },
    {
      path: '/about/:id',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})
export default router