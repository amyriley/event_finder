import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchEvents from './views/SearchEvents.vue'
import DetailedEventInfo from './views/DetailedEventInfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/SearchEvents',
      name: 'search_events',
      component: SearchEvents
    },
    {
      path: '/DetailedEventInfo',
      name: 'detailed-event-info',
      component: DetailedEventInfo
    },
  ]
})
