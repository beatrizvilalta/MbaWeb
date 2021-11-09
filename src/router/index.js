import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import UserList from '../views/UserList'
import UserDetail from '../views/UserDetail'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/userDetail',
    name: 'UserDetail',
    component: UserDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'http://localhost:8080/',
  routes
})

export default router
