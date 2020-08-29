import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
// import { rtdbPlugin, firestorePlugin } from 'vuefire'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from "./store"
import { auth } from "./firebase/app"

// Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
// Vue.use(rtdbPlugin);
// Vue.use(firestorePlugin);

auth.onAuthStateChanged(user => {
  console.log('changed user')
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')