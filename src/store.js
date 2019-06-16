import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '@/apiKeys';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    locationId: '',
    germanyLocations: [],
    germanyEvents: [],
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
    getLocationId( {commit} ) {
      axios
      .get(`https://api.songkick.com/api/3.0/search/locations.json?query=` + `${cityName}` + `&apikey=${apiConfig.songkickKey}`)
      .then(data => {
        console.log(data.data.resultsPage.results.location);
        let locationId = data.data.resultsPage.results.location.filter(l => l.city.country.displayName === 'Germany');
        console.log(locationId);
        commit('SET_LOCATION_ID', locationId);
        console.log('commit locationId')
      })
      .catch(error => {
        console.log(error);
      })
      this.loading = false;
    },
    loadGermanyLocations({ commit }) {
      this.loading = true;
      axios
        .get(`https://api.songkick.com/api/3.0/search/locations.json?query=germany&per_page=100&apikey=${apiConfig.songkickKey}`)
        .then(data => {
          console.log(data.data.resultsPage.results.location);

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

          console.log(germanyLocations);
          commit('SET_GERMANY_LOCATIONS', germanyLocations);
          console.log('commit germanyLocations')
        })
        .catch(error => {
          console.log(error);
        })
        this.loading = false;
    },
    loadGermanyEvents({ commit }) {
      this.loading = true;
      axios
        .get(`https://api.songkick.com/api/3.0/search/venue.json?query=germany&per_page=100&apikey=${apiConfig.songkickKey}`)
        .then(data => {
          console.log(data.data.resultsPage.results.venue);
          let germanyEvents = data.data.resultsPage.results.venue.filter(v => v.city.country.displayName === 'Germany');
          console.log(germanyEvents);
          commit('SET_GERMANY_EVENTS', germanyEvents);
          console.log('commit germanyEvents')
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
    SET_GERMANY_LOCATIONS (state, germanyLocations) {
      state.germanyLocations = germanyLocations;
      console.log('set locations')
    },
    SET_LOCATION_ID (state, locationId) {
      state.locationId = locationId;
    },
    SET_GERMANY_EVENTS (state, germanyEvents) {
      state.germanyEvents = germanyEvents;
      console.log('set events')
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
    }
  }
})

