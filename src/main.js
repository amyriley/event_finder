import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import apiConfig from '@/apiKeys'

import 'babel-polyfill';
// import VueFirebase from 'vue-firebase'

Vue.config.productionTip = false

// firebase.initializeApp(firebaseConfig);
// Vue.prototype.$firebase = firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
