import Vue from 'vue'
import App from './App.vue'
import vuefire from 'vuefire'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'toastr/build/toastr.min.css'

Vue.config.productionTip = false
Vue.use(vuefire)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
