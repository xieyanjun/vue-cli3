import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[{
        path: '1-1',
        name: 'Main1',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main1.vue')
      },{
        path: '/1-2',
        name: 'Main2',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main2.vue')
      },{
        path: '1-3',
        name: 'Main3',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Main3.vue')
      }]
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
