<template>
    <div id="event-card-search-result" >
        <div class="event-card" v-for="(event, index) in filteredEvents" :key="index">
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
                                <v-card-title primary-title class="text-xs-left-center">
                                    <div>
                                        <div class="subheading">{{ event.performance[0].displayName }}</div>
                                        <div>{{ moment( event.start.date ).format("ddd, MMM Do YYYY") }} </div>
                                        <div>{{ event.venue.displayName }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn @click.native="loadEventsForSameVenue" :to="{ name: 'detailed-event-info', params: { eventID: event.id, venueID: event.venue.id }}" class="text-xs-left" flat :id="event.id">More Details</v-btn>
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
import router from '@/router'

var moment = require('moment');

export default {
    name: 'event-card-search-result',
    data () {
        return {
            moment: moment
        }
    },
    mounted () {
        this.$store.dispatch('loadEvents');
    },
    computed: {
        ...mapState([
            'events',
            'searchInput',
            'searchDate'
        ]),
        filteredEvents () {
            if (this.searchInput === '' && this.searchDate === '') {
                return this.events;
            }

            return this.events.filter((event) => {
                return event.performance[0].displayName.toLowerCase().match(this.searchInput.toLowerCase()) && event.start.date.match(this.searchDate)
            })
        },
    },
    methods: {
        loadEventsForSameVenue: function () {
            this.$store.dispatch('loadEventsForSameVenue', router.currentRoute.params.venueID);
        },
    },
}
</script>