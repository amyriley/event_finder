<template>
    <div id="more-events-list">
        <div>
            <h3>Upcoming events at this venue:</h3>
            <v-flex xs12>
                <v-card flat v-for="(event, index) in eventsSameVenue" :key="index">
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
                                <v-card-title primary-title class="text-xs-left-center">
                                    <div>
                                        <div class="subheading"></div>
                                        <div>{{ event.performance[0].displayName }}</div>
                                        <div>{{ moment( event.start.date ).format("ddd, MMM Do YYYY") }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn :href="event.uri" class="text-xs-left" flat>Tickets</v-btn>
                                    <v-btn icon disabled>
                                        <v-icon>star</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
    name: 'more-events-list',
    props: ['eventID', 'venueID'],
    computed: {
        ...mapState([
            'events',
            'eventsSameVenue',
        ]),
        ...mapGetters([
        ]),
    },
    methods: {
        moment
    }
}
</script>


