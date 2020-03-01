import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/login.vue'
import SignUp from './views/Signup.vue'
import Live from './views/Live.vue'
import {Auth} from "./firebase/auth"
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
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Auth.currentUser) {
      next();
    } else {
    next({ path: '/' })
    }
  }
  next();
})
export default router