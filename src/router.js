import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchEvents from './views/SearchEvents.vue'
import DetailedEventInfo from './views/DetailedEventInfo.vue'
import Welcome from './components/Welcome.vue'
import LiveChat from './components/LiveChat.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/SearchEvents',
      name: 'search-events',
      component: SearchEvents,
      props: true
    },
    {
      path: '/DetailedEventInfo/:eventID',
      name: 'detailed-event-info',
      component: DetailedEventInfo,
      props: true
    },
    {
      path: '/LiveChat',
      name: 'live-chat',
      component: LiveChat,
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.name) {
          next()
        } else {
            next({ name: 'welcome' })
        }
      }
    },
    {
      path: '/Welcome',
      name: 'welcome',
      component: Welcome
    },
  ]
})
