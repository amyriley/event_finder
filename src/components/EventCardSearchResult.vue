<template>
    <div id="event-card-search-result" >
        <div>
            <div class="event-card" v-for="(event, index) in filteredEvents" :key="index">
                <v-card color="grey">
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
                                                <div class="title text-wrap">{{ event.performance[0].displayName }}</div>
                                                <div class="font-weight-light">{{ moment( event.start.date ).format("ddd, MMM Do YYYY") }} </div>
                                                <div>{{ event.venue.displayName }}</div>
                                            </div>
                                        </v-card-title>
                                    </v-flex>
                                </v-layout>
                                <v-card-actions>
                                    <v-flex class="text-xs-right">
                                        <v-btn 
                                        color="success"
                                        @click.native="loadEventsForSameVenue" :to="{ name: 'detailed-event-info', params: { eventID: event.id, venueID: event.venue.id, event: event }}" class="white--text">More Details</v-btn>
                                    </v-flex>
                                    <div>
                                        <v-btn :class="{selected: selected}" icon @click.native="addToFavourites(event)">
                                            <v-icon >star</v-icon>
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import router from '@/router'
import moment from 'moment'
import db from '@/firebase/init'

export default {
    name: 'event-card-search-result',
    data() {
        return {
            favourite: null,
            starIcon: '',
            selected: false
        }
    },
    computed: {
        ...mapState([
            'events',
            'searchInput',
            'searchDate',
            'metroAreaId'
        ]),
        filteredEvents () {
            if (this.searchInput === '' && this.searchDate === '') {
                return this.events;
            }

            return this.events.filter((event) => {
                return event.performance[0].displayName.toLowerCase().match(this.searchInput.toLowerCase()) && event.start.date.match(this.searchDate)
            })
        },
        compClasses: function(){
            return {
                selected: this.selected
            }
        }
    },
    methods: {
        loadEventsForSameVenue: function () {
            this.$store.dispatch('loadEventsForSameVenue', router.currentRoute.params.venueID);
        },
        moment,
        addToFavourites: function (event) {
            db.collection('favourites').add({
                name: event.performance[0].displayName,
                date: event.start.date,
                venue: event.venue.displayName,
                timestamp: moment( Date.now() ).format("ddd, MMM Do YYYY"),
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style>

.selected {
    background-color: white
}

</style>