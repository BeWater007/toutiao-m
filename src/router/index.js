import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import My from '@/views/my'
import Wenda from '@/views/wenda'
import Video from '@/views/video'

Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/my',
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home'
      },
      {
        path: 'wenda',
        component: Wenda,
        name: 'wenda'
      },
      {
        path: 'video',
        component: Video,
        name: 'video'
      },
      {
        path: 'my',
        component: My,
        name: 'my'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
