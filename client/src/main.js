import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js/auto'
import { store }from './store/store'; ''
import{BootstrapVue, IconsPlugin} from 'bootstrap-vue'


Vue.use(Chartkick.use(Chart))
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
