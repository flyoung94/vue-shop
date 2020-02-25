import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 导入全局css样式
import '../assets/css/global.css'
// 导入字体库
import '../assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 登录组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users.vue'

// 配置请求的根路径
axios.defaults.baseURL = 'http://192.168.1.100:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios



Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', 
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 要访问的路径
  // from 代表从哪个路径跳转而来的
  // next 表示放行：next()直接放行，next('/xx') 强制跳转
  if (to.path === '/login')
    return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr)
    return next('/login')
  next()
})

export default router
