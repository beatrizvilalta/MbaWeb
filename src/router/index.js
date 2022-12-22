import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import UserList from '../views/unused/UserList'
import MemberHome from '../views/MemberHome'
import PaymentForm from '../views/unused/PaymentForm'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'MemberHome',
    component: MemberHome
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList
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
