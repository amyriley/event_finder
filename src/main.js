import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import apiConfig from '@/apiKeys'
import VueChatScroll from 'vue-chat-scroll'
import firebase from 'firebase'
import 'babel-polyfill';

Vue.config.productionTip = false
Vue.use(VueChatScroll)

let app = null;

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {

  // init app if not already created
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


