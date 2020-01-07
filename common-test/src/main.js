import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'


Vue.config.productionTip = false

// axios.defaults.transformRequest = [function (data, headers) {
//   console.log(headers)
//   if (headers['Content-Type'].indexOf("application/x-www-form-urlencoded") > -1) {
//     return qs.stringify(data)
//   }
//   if (headers['Content-Type'].indexOf("application/json") > -1) {
//     return JSON.stringify(data)
//   }
//   return data
// }]

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
