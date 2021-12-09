import Vue from 'vue'
import App from './App.vue'
import CirDrager from './package';

Vue.config.productionTip = false
Vue.use(CirDrager)

new Vue({
  render: h => h(App),
}).$mount('#app')
