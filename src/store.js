import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { async } from 'q';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    events: [],
    eventsSameVenue: [],
    loading: false,
  },
  getters: {
    getEventById (state) {
    return eventID => {
      return state.events.find(event => event.id == eventID)
      }
    },
  },
  actions: {
    loadEvents({ commit }) {
      async
      axios
        .get('https://api.songkick.com/api/3.0/metro_areas/28443/calendar.json?apikey=b4k7heOg6FoqZwFY')
        .then(data => {
          console.log(data.data.resultsPage.results.event);
          let events = data.data.resultsPage.results.event;
          commit('SET_EVENTS', events);
        })
        .catch(error => {
          console.log(error);
        })
    },
    loadEventsForSameVenue({ commit }, venueID) {
      axios
        .get('https://api.songkick.com/api/3.0/venues/' + venueID + '/calendar.json?apikey=b4k7heOg6FoqZwFY')
        .then(data => {
          console.log(data.data.resultsPage.results.event);
          let eventsSameVenue = data.data.resultsPage.results.event;
          commit('SET_EVENTS_SAME_VENUE', eventsSameVenue);
        })      
        .catch(error => {
          console.log(error);
        })  
    }
   },
  mutations: {
    SET_EVENTS (state, events) {
      state.events = events;
    },
    SET_EVENTS_SAME_VENUE (state, eventsSameVenue) {
      state.eventsSameVenue = eventsSameVenue;
    }
  }
})

