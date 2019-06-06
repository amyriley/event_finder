import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    events: [],
  },
  actions: {
    loadEvents({ commit }) {
      axios
        .get('https://api.songkick.com/api/3.0/metro_areas/28443/calendar.json?apikey=b4k7heOg6FoqZwFY')
        .then(data => {
          console.log(data.data.resultsPage.results.event)
          let events = data.data.resultsPage.results.event;
          commit('SET_EVENTS', events)
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  mutations: {
    SET_EVENTS (state, events) {
      state.events = events
    }
  }
})
