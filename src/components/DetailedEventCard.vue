<template>
    <div id="detailed-event-card">
        <div>
            <v-layout align-center>
                <v-flex xs12>
                    <v-card>
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"
                            height="250"
                        ></v-img>
                        <v-card-title primary-title>{{ event.performance[0].displayName }}</v-card-title>
                        <!-- <v-card-title primary-title align-center>
                            <div>
                                <h3 class="headline mb-0">{{ event.performance[0].displayName }} </h3>
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
                        </v-card-title> -->
                        <v-card-actions>
                            <v-btn :href="event.uri" flat>Tickets</v-btn>
                        </v-card-actions>
                        <h3 class="subheading mb-0">Venue: {{ event.venue.displayName }}</h3>
                        <div>Location: {{ event.location.city }}</div>
                        <v-spacer></v-spacer>
                        <div id="map" style="width: 100%; height: 300px">
                            <iframe
                                width="600"
                                height="450"
                                frameborder="0" style="border:0"
                                :src="mapSrcUrl(event.venue.displayName, event.location.city)" allowfullscreen>
                            </iframe>
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