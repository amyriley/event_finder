<template>
    <div id="more-events-list">
        <div>
            <div color="grey" class="subheading text-xs-center white--text mt-2 mb-2">Upcoming events at this venue</div>
            <v-card color="grey" flat v-for="(event, index) in eventsSameVenue" :key="index">
                <v-container fluid grid-list>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card color="blue-grey darken-2" class="white--text">
                            <v-layout>
                                <v-flex xs5 ma-2>
                                    <v-img
                                        src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                                        height="125px"
                                        contain
                                    ></v-img>
                                </v-flex>
                                <v-flex xs7>
                                    <v-card-title primary-title>
                                        <div>
                                            <div class="headline">{{ event.performance[0].displayName }}</div>
                                            <div class="font-weight-light">{{ moment( event.start.date ).format("ddd, MMM Do YYYY") }} </div>
                                            <div>
                                                <template v-if="event.start.time === null">
                                                    <div>No time available yet, sorry!</div>
                                                </template>
                                                <template v-else>
                                                    <div>
                                                        {{ moment(event.start.time, "HH:mm:ss").format("h A") }}
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-card-actions>
                                <v-flex class="text-xs-right">
                                    <v-btn 
                                    :href="event.uri" 
                                    class="text-xs-left white--text" 
                                    color="success"
                                    round
                                    >Tickets</v-btn>
                                </v-flex>
                                <v-btn icon disabled>
                                    <v-icon>star</v-icon>
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
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


