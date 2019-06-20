<template>
    <div id="germany-events-dropdown">
        <template>
            <div class="text-xs-center">
                <v-menu 
                bottom
                auto  
                dark>
                    <template v-slot:activator="{ on }">
                        <div class="text-xs-center">
                            <v-btn
                            color="success"
                            v-on="on"
                            round
                            >
                            Select City
                            </v-btn>
                        </div>
                    </template>
                    <v-list>
                        <v-list-tile v-for="(location, index) in germanyLocations" :key="index" :to="{ name: 'search-events', params: { location: location }}" @click.native="loadEvents() + updateCityName()">
                            <v-list-tile-title >{{ location.cityName }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import router from '@/router'

export default {
    name: 'germany-events-dropdown',
    mounted () {
        this.$store.dispatch('loadGermanyLocations');
    },
    computed: {
        ...mapState([
            'germanyLocations',
        ]),
    },
    methods: {
        loadEvents: function () {
            this.$store.commit('UPDATE_METRO_AREA_ID', router.currentRoute.params.location.metroAreaId);
            this.$store.dispatch('loadEvents', router.currentRoute.params.location.metroAreaId);
        },
        updateCityName: function () {
            this.$store.commit('SET_CITY_NAME', router.currentRoute.params.location.cityName);
        }
    }
}
</script>