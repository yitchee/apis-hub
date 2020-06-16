import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@/assets/styles/index.css';

import App from './App.vue';
import router from './router';
import {store} from './store/store';

Vue.use(VueAxios, axios);

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app');
