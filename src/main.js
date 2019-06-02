import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import * as VueGoogleMaps from "vue2-google-maps";


Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL='https://healthapi.herokuapp.com'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBDMLoCa8sUdVWupYUI34CQc-L0KfHBs-E",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
