import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import workspace from '@/components/workspace'
import home from '@/components/home'
import db from '@/utils/localstorage'
import request from '@/utils/request'

Vue.use(Router)
let constRouter = [

  {path: '/', redirect: '/home'},
  {
    path: '/login',
    name: '登录页',
    component: login
  },
  {
    path: '/home',
    name: '首页',
    component: home
  },
  {
    path: '/workspace',
    name: '工作台',
    component: workspace
  }
]

let router = new Router({
  routes: constRouter
})

const whiteList = ['/login', '/workspace']
let asyncRouter
// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    console.log('白名单')
    next()
    return
  }
  let token = db.get('USER_TOKEN')
  let user = db.get('USER')
  let userRouter = get('USER_ROUTER')
  if (token.length && user) {
    if (!asyncRouter) {
      if (!userRouter) {
        request.get(`menu/${user.username}`).then((res) => {
          asyncRouter = res.data
          console.log(asyncRouter)
          save('USER_ROUTER', asyncRouter)
          go(to, next)
        })
      } else {
        asyncRouter = userRouter
        go(to, next)
      }
    } else {
      next()
    }
  } else {
    console.log('跳转')
    next('/login')
  }
})

function go (to, next) {
  asyncRouter = filterAsyncRouter(asyncRouter)

  router.addRoutes(asyncRouter)
  next({...to, replace: true})
}

function save (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function get (name) {
  return JSON.parse(localStorage.getItem(name))
}
function filterAsyncRouter (routes) {
  return routes.filter((route) => {
    let component = route.component
    console.log(route)
    if (component) {
      if (component) {
        switch (route.component) {
          case 'home':
            route.component = home
            break
          default:
            route.component = view(component)
        }
      }

      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
  })
}
function view (path) {
  return function (resolve) {
    console.log(`@/components/${path}.vue`)
    import(`@/components/${path}.vue`).then(mod => {
      resolve(mod)
    })
  }
}
export default router
