import Vue from 'vue';
import App from './App.vue';
import { promiseHandle } from './utils/promise';
Vue.config.productionTip = false;

promiseHandle().then(value => {
  console.log(value);
})

new Vue({
  render: h => h(App),
}).$mount('#app');
