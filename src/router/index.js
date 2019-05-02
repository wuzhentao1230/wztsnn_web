import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import db from '@/utils/localstorage'

Vue.use(Router)
let constRouter = [
  {
    path: '/login',
    name: '登录页',
    component: login
  },
  {
    path: '/',
    name: '首页',
    component: home
  }
]

let router = new Router({
  routes: constRouter
})

const whiteList = ['/login']

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  }
  let token = db.get('USER_TOKEN')
  let user = db.get('USER')
  if (token.length && user) {
    next()
  } else {
    next('/login')
  }
})

export default router
