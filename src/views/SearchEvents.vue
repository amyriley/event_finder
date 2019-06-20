<template>
  <div class="search-events">
    <nav>
      <v-toolbar flat app dark>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <!-- <v-spacer></v-spacer> -->
        <input type="text" v-model="searchInput" placeholder="search artists"/>
        <v-menu>
          <v-text-field slot="activator" :value="getSelectedDateLabel(searchDate)"  prepend-icon="date_range" ></v-text-field>
          <v-date-picker class="datePicker" v-model="searchDate"></v-date-picker>
      </v-menu>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" app></v-navigation-drawer>
    </nav>
    <div class="subheading ma-2 white--text">Music events in the {{ cityName }} metro area...</div>
    <EventCardSearchResult></EventCardSearchResult>
    <NavigationBottom></NavigationBottom>
  </div>
</template>

<script>
import GermanyEventsDropdown from '@/components/GermanyEventsDropdown'
import NavigationBottom from '@/components/NavigationBottom'
import EventCardSearchResult from '@/components/EventCardSearchResult'
import { mapState } from 'vuex'
import router from '@/router'
import moment from 'moment'

export default {
  name: 'search-events',
  props: ['location'],
  components: {
    EventCardSearchResult,
    NavigationBottom,
    GermanyEventsDropdown
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapState([
            'cityName',
            'events',
            'searchInput',
            'searchDate',
            'metroAreaId'
        ]),
    searchInput: {
      get() {
        return this.$store.state.searchInput;
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH_INPUT', value);
      },
    },
    searchDate: {
      get() {
        return this.$store.state.searchDate;
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH_DATE', value);
      },
    },
  },
  methods: {
    moment,
    getSelectedDateLabel: (date) => {
      if (!date) {
        return 'date';
      } else {
        return moment(date).format('ll');
      }
    }
  }
}
</script>
