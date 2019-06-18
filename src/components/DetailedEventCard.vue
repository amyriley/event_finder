<template>
    <div id="detailed-event-card">
        <div>
            <v-layout align-center>
                <v-flex xs12>
                    <v-card color="grey" class="white--text">
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                            aspect-ratio="2.75"
                            height="250"
                        ></v-img>
                        <v-flex class="text-xs-center">
                                <v-card-title>
                                    <v-flex class="headline text-xs-center">
                                        {{ event.performance[0].displayName }}
                                    </v-flex>
                                </v-card-title>
                                <div>
                                    <div>{{ moment( event.start.date ).format("ddd, MMM Do YYYY") }}</div>
                                    <template v-if="event.start.time === null">
                                        <div>No time available yet, sorry!</div>
                                    </template>
                                    <template v-else>
                                        <div>
                                            {{ moment(event.start.time, "HH:mm:ss").format("h A") }}
                                        </div>
                                    </template>
                                </div>
                        </v-flex>
                        <v-card-actions>
                            <v-flex class="text-xs-center mb-3 mt-3">
                                <v-btn 
                                    :href="event.uri" 
                                    color="success"
                                    round
                                    >Tickets
                                </v-btn>
                            </v-flex>
                        </v-card-actions>
                        <div class="text-xs-center">
                            <div class="subheading font-weight-regular">Venue</div>
                            <div class="font-weight-light">{{ event.venue.displayName }}</div>
                            <div class="font-weight-thin mb-1">{{ event.location.city }}</div>
                            <div id="map" class="ma-3">
                                <iframe
                                    width="100%"
                                    height="300"
                                    frameborder="0" style="border:0"
                                    :src="mapSrcUrl(event.venue.displayName, event.location.city)" allowfullscreen>
                                </iframe>
                            </div>
                        </div>
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
import moment from 'moment'

export default {
    name: 'detailed-event-card',
    props: ['eventID'],
    mounted () {
    },
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
    methods: {
        moment,
        mapSrcUrl: function (venueName, venueCity) {
            return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBZtrE2I0U1lgd9cr65s5khYysvNjb8CMM&q=${venueName},${venueCity}`
        }
    }
}
</script>