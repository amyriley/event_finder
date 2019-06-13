<template>
    <div id="detailed-event-card">
        <div>
            <v-layout>
                <v-flex xs12>
                    <v-card>
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"
                        ></v-img>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ event.performance[0].displayName }} </h3>
                                <div>{{ event.start.date }}</div>
                                <div>{{ event.start.time }}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn :href="event.uri" flat>Tickets</v-btn>
                        </v-card-actions>
                        <h3 class="subheading mb-0">Venue: {{ event.venue.displayName }}</h3>
                        <div>Location: {{ event.location.city }}</div>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import gmapsInit from '@/utils/gmaps';

var moment = require('moment');

export default {
    name: 'detailed-event-card',
    data () {
        return {
            moment: moment
        }
    },
    props: ['eventID', 'venueID'],
    computed: {
        ...mapState([
            'events',
        ]),
        ...mapGetters([
            'getEventById'
        ]),
        event: function () {
        return this.getEventById(this.$route.params.eventID);
      }
    },
}
</script>