import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/login.vue'
import SignUp from './views/Signup.vue'
import Live from './views/Live.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/live',
      name: 'live',
      component: Live,
    },
  ]
})

export default router