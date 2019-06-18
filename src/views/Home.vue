<template>
  <div class="home">
    <div>
      <v-layout align-center>
        <v-flex xs12>
          <v-content class="text-xs-center white--text">
              <div>
                <v-flex>
                  <div class="display-1 text-xs-center pa-5 ma-4">Music Event Finder</div>
                </v-flex>
                <v-flex class="pa-5">
                  <div class="title">Find live music events near you!</div>
                </v-flex>
                <div>
                  <GermanyEventsDropdown></GermanyEventsDropdown>
                </div>
              </div>
          </v-content>
        </v-flex>  
      </v-layout>
    </div>
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

<style scoped>


</style>
