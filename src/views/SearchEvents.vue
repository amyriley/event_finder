<template>
  <div class="search-events">
    <nav>
      <v-toolbar flat app dark>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-text-field label="search by artist" single-line></v-text-field>
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

export default {
  name: 'search-events',
  components: {
    EventCardSearchResult
  },
  data() {
    return {
      drawer: false,
      searchDate: null
    }
  },
  computed: {
    formattedDate() {
      return this.searchDate ? format(this.searchDate, 'Do MMM YYYY') : ''
    }
  }
}
</script>