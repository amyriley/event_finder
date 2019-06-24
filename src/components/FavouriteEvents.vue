<template>
    <div id="favourote-events">
        <div>
            <v-card color="grey" flat v-for="favourite in favourites" :key="favourite.id">
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
                                        <v-card-title primary-title class="text-xs-left">
                                            <div>
                                                <div class="title text-wrap">{{ favourite.name }}</div>
                                                <div class="font-weight-light">{{ favourite.date }}</div>
                                                <div>{{ favourite.venue }} </div>
                                            </div>
                                        </v-card-title>
                                    </v-flex>
                                </v-layout>
                                <v-card-actions>
                                        <v-flex class="text-xs-right">
                                            <v-btn 
                                            color="success"
                                            class="white--text"
                                            @click.native="removeFromFavourites(favourite)"
                                            >
                                            Remove
                                            </v-btn>
                                        </v-flex>
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
import db from '@/firebase/init'
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
    name: 'favourite-events',
    data() {
        return {
            favourites: [],
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
    created(favourite) {
        let ref = db.collection('favourites').orderBy('date')

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.favourites.push({
                        name: doc.data().name,
                        venue: doc.data().venue,
                        date: doc.data().date,
                        id: doc.id
                    })
                } 
            })
        })
    },
    methods: {
        removeFromFavourites: function(favourite) {
            db.collection('favourites').doc(favourite.id).delete()
            .then(() => {
                this.favourites = this.favourites.filter(event => {
                    return event.id != favourite.id
                })
            })
        }
    }
}
</script>

<style>

.active {

}

</style>




