<template>
    <div id="event-card-search-result" >
        <div class="event-card" v-for="(event, index) in events" :key="index">
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
                                        <div class="subheading">{{ event.performance[0].displayName }}</div>
                                        <div>{{ event.start.date }}</div>
                                        <div>{{ event.venue.displayName }}</div>
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
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'event-card-search-result',
    mounted () {
        this.$store.dispatch('loadEvents')
    },
    computed: {
        ...mapState([
            'events'
        ])
    }
}
</script>