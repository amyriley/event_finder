import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '@/apiKeys';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    events: [],
    eventsSameVenue: [],
    searchInput: '',
    searchDate: '',
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
      this.loading = true;
      axios
        .get(`https://api.songkick.com/api/3.0/metro_areas/28443/calendar.json?&per_page=100&apikey=${apiConfig.songkickKey}`)
        .then(data => {
          console.log(data.data.resultsPage.results.event);
          let events = data.data.resultsPage.results.event;
          commit('SET_EVENTS', events);
        })
        .catch(error => {
          console.log(error);
        })
        this.loading = false;
    },
    async loadEventsForSameVenue({ commit }, venueID) {
      this.loading = true;
      await axios
        .get(`https://api.songkick.com/api/3.0/venues/` + `${venueID}` + `/calendar.json?apikey=${apiConfig.songkickKey}`)
        .then(result => {
          console.log(result.data.resultsPage.results.event);
          let eventsSameVenue = result.data.resultsPage.results.event;
          commit('SET_EVENTS_SAME_VENUE', eventsSameVenue);
        })      
        .catch(error => {
          console.log(error);
        })  
        this.loading = false;
    },
   },
  mutations: {
    SET_EVENTS (state, events) {
      state.events = events;
    },
    SET_EVENTS_SAME_VENUE (state, eventsSameVenue) {
      state.eventsSameVenue = eventsSameVenue;
    },
    UPDATE_SEARCH_INPUT (state, value) {
      state.searchInput = value;
    },
    UPDATE_SEARCH_DATE (state, value) {
      state.searchDate = value;
    }
  }
})

