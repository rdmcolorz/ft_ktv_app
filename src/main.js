import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import { rtdbPlugin } from 'vuefire'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(rtdbPlugin);
Vue.use(VueYoutube)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')