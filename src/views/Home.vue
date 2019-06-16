<template>
  <div class="home">
    <v-content>
      <h1>Event Finder</h1>
      <p>Find live music events...</p>
      <GermanyEventsDropdown></GermanyEventsDropdown>
    </v-content>  
  </div>
</template>

<script>
import GermanyEventsDropdown from '@/components/GermanyEventsDropdown'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import router from '@/router'

export default {
  name: 'home',
  computed: {
      ...mapState([
          'germanyLocations',
          'locationId'
      ]),
  },
  components: {
    GermanyEventsDropdown
  }
}
</script>
