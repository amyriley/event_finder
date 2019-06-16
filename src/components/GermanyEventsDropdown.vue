<template>
    <div id="germany-events-dropdown">
        <template>
            <div class="text-xs-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        color="primary"
                        dark
                        v-on="on"
                        >
                        Select City
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile v-for="(location, index) in germanyLocations" :key="index" :to="{ name: 'search-events', params: { location: location }}">
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
}
</script>