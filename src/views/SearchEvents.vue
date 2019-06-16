<template>
  <div class="search-events">
    <nav>
      <v-toolbar flat app dark>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <input type="text" v-model="searchInput" placeholder="search artists"/>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" app></v-navigation-drawer>
    </nav>
    <v-menu dark>
      <v-text-field slot="activator" :value="getSelectedDateLabel(searchDate)"  prepend-icon="date_range" ></v-text-field>
      <v-date-picker v-model="searchDate"></v-date-picker>
    </v-menu>
    <EventCardSearchResult></EventCardSearchResult>
  </div>
</template>

<script>
import EventCardSearchResult from '@/components/EventCardSearchResult'
import { mapState } from 'vuex'
import router from '@/router'
import moment from 'moment'

export default {
  name: 'search-events',
  components: {
    EventCardSearchResult
  },
  data() {
    return {
      drawer: false,
      searchDate2: '',
      searchInput2: ''
    }
  },
  mounted() {
    loadEventsForMetroArea => {
        this.$store.dispatch('loadEventsForMetroArea', router.currentRoute.params.location.metroAreaId);
    }
  },
  computed: {
    ...mapState([
            'events',
            'searchInput',
            'searchDate'
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
    }
  },
  methods: {
    moment,
    getSelectedDateLabel: (date) => {
      if (!date) {
        return 'Search by date';
      } else {
        return moment(date).format('ddd, MMM Do YYYY');
      }
    }
  }
}
</script>