import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import { rtdbPlugin } from 'vuefire'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import VueYoutube from 'vue-youtube'
import store from "./store"
import { Auth } from "./firebase/auth"

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(rtdbPlugin);
Vue.use(VueYoutube)

Auth.onAuthStateChanged(user => {
  console.log('changed user')
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')