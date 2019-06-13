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
      <v-text-field :value="formattedDate" slot="activator" label="search by date" prepend-icon="date_range" ></v-text-field>
      <v-date-picker v-model="searchDate"></v-date-picker>
    </v-menu>
    <EventCardSearchResult></EventCardSearchResult>
  </div>
</template>

<script>
import format from 'date-fns/format'
import EventCardSearchResult from '@/components/EventCardSearchResult'
import { mapState } from 'vuex'

export default {
  name: 'search-events',
  components: {
    EventCardSearchResult
  },
  data() {
    return {
      drawer: false,
      searchDate: null,
    }
  },
  computed: {
    ...mapState([
            'events',
            'searchInput'
        ]),
    formattedDate() {
      return this.searchDate ? format(this.searchDate, 'Do MMM YYYY') : ''
    },
    searchInput: {
      get() {
        return this.$store.state.searchInput;
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH_INPUT', value);
      },
    },
  },
}
</script>