<template>
  <div class="event-card">
    <v-flex xs12>
        <v-card flat>
            <v-container fluid grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs5>
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                            height="125px"
                            contain
                        ></v-img>
                    </v-flex>
                    <v-flex xs7>
                        <v-card-title primary-title>
                            <div>
                                <div class="subheading">Event Title</div>
                                <div>Event Dates</div>
                                <div>Event Venue</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat to="/DetailedEventInfo">More Details</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-flex>
  </div>
</template>

<script>

export default {
  name: 'event-card',
  components: {
  }
}
</script>