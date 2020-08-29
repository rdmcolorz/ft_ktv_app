import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import SignUp from './views/Signup.vue'
import Live from './views/Live.vue'
import {auth} from "./firebase/app"
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
      meta: { requiresauth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresauth) {
    if (auth.currentUser) {
      next();
    } else {
    next({ path: '/' })
    }
  }
  next();
})
export default router