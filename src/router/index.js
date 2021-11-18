import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import UserList from '../views/UserList'
import UserDetail from '../views/UserDetail'
import PaymentForm from '../views/PaymentForm'


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
    path: '/userDetail/:id',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/paymentForm',
    name: 'AddPayment',
    component: PaymentForm
  },
  {
    path: '/paymentForm/:paymentId',
    name: 'EditPayment',
    component: PaymentForm
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
