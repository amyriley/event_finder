import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '@/apiKeys';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    currentUser: [],
    cityName: '',
    metroAreaId: '',
    germanyLocations: [],
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
    loadGermanyLocations({ commit }) {
      this.loading = true;
      axios
        .get(`https://api.songkick.com/api/3.0/search/locations.json?query=germany&per_page=100&apikey=${apiConfig.songkickKey}`)
        .then(data => {

          let locationData = data.data.resultsPage.results.location;

          let germanyLocations = locationData
            .filter(l => l.city.country.displayName === 'Germany')
            .map(l => {
              return {
                metroAreaId: l.metroArea.id,
                cityName: l.city.displayName
              }
            })
            .sort((a, b) => {
              if (a.cityName > b.cityName) {
                return 1;
              } else {
                return -1;
              }
            });

          commit('SET_GERMANY_LOCATIONS', germanyLocations);
        })
        .catch(error => {
          console.log(error);
        })
        this.loading = false;
    },
    loadEvents({ commit }, metroAreaId) {
      this.loading = true;
      axios
        .get(`https://api.songkick.com/api/3.0/metro_areas/${metroAreaId}/calendar.json?per_page=100&apikey=${apiConfig.songkickKey}`)
        .then(data => {
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
    SET_CURRENT_USER (state, currentUser) {
      state.currentUser = currentUser
      console.log(state.currentUser)
    },
    SET_CITY_NAME (state, cityName) {
      state.cityName = cityName;
    },
    SET_GERMANY_LOCATIONS (state, germanyLocations) {
      state.germanyLocations = germanyLocations;
    },
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
    },
    UPDATE_METRO_AREA_ID (state, metroAreaId) {
      state.metroAreaId = metroAreaId;
    }
  }
})

