<template>
    <div id="login">
        <v-container>
            <v-flex class="text-xs-center white--text mt-3 mb-3">
                <div class="subheading">Login to your Event Finder account</div>
            </v-flex>
            <v-card>
                <v-flex class="pt-2 ma-3">
                    <label class="font-weight-light" for="email">Email address:</label>
                    <v-text-field
                        v-model="email"
                        name="email"
                        label="email address"
                        color="black"
                        font-weight-light
                        caption
                    ></v-text-field>
                    <label class="font-weight-light" for="password">Password:</label>
                    <v-text-field
                        v-model="password"
                        name="password"
                        label="password"
                        color="black"
                        font-weight-light
                        caption
                    ></v-text-field>
                    <p v-if="feedback">{{ feedback }}</p>
                </v-flex>
                <v-flex class="text-xs-center">
                    <v-btn class="login-button" @click="login">Login</v-btn>
                </v-flex>
            </v-card>
            <v-flex class="text-xs-center white--text mt-5 mb-3">
                <div class="subheading mb-2">Register for an Event Finder account</div>
                <v-btn class="signup-button" :to="{ name: 'signup'}">Register</v-btn>
            </v-flex>
        </v-container>
        <NavigationBottom></NavigationBottom>
    </div>
</template>

<script>
import NavigationBottom from '@/components/NavigationBottom'
import firebase from 'firebase'
import { mapState } from 'vuex'


export default {
    name: 'Login',
    data () {
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
    components: {
        NavigationBottom
    },
    methods: {
        login() {
            if(this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$router.push({ name: 'welcome'})
                    this.$store.commit('SET_CURRENT_USER', this.username);
                }).catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = 'Please fill out both fields'
            }
        },
    }
}
</script>

