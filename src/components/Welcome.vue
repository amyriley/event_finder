<template>
    <div id="welcome">
        <div>
            <v-layout align-center>
                <v-flex xs12>
                    <v-content class="text-xs-center white--text">
                        <div>
                            <v-flex>
                                <div class="display-1 text-xs-center ma-5">Welcome, {{ currentUser }}!</div>
                            </v-flex>
                            <v-flex>
                                <p v-if="feedback">{{ feedback }}</p>
                            </v-flex>
                            <v-flex>
                                <v-btn :to="{ name: 'live-chat', params: { usernameDisplay: this.usernameDisplay }}">Enter Chat</v-btn>
                            </v-flex>
                            <v-flex>
                                <v-btn v-on:click="logout">Logout</v-btn>
                            </v-flex>
                        </div>
                        <div>Here are your favourite events, {{ currentUser }}:</div>
                        <FavouriteEvents></FavouriteEvents>
                    </v-content>
                </v-flex>  
            </v-layout>
            <NavigationBottom></NavigationBottom>
        </div>
    </div>
</template>

<script>
import FavouriteEvents from '@/components/FavouriteEvents'
import NavigationBottom from '@/components/NavigationBottom'
import firebase from 'firebase'
import db from '@/firebase/init'
import { mapState } from 'vuex'

export default {
    name: 'welcome',
    data () {
        return {
            name: null,
            feedback: null,
            usernameDisplay: null,
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
    components: {
        NavigationBottom,
        FavouriteEvents
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'login'})
                this.$store.commit('SET_CURRENT_USER', '');
            })
        },
    },
    created() {
        let user = firebase.auth().currentUser;
        let uid;

        if (user != null) {
            uid = user.uid;
        }

        let ref = db.collection('users').doc(uid);

        ref.get().then((doc) => {
            // this.usernameDisplay = doc.data().username
            this.$store.commit('SET_CURRENT_USER', doc.data().username);
        })
        .catch(function(error) {
            console.log('Error getting document:', error);
        });

       
    },
}
</script>

<style scoped>

.v-card {
  height: 0
}

</style>