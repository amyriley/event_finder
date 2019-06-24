<template>
    <div id="signup">
        <v-container>
            <v-flex class="text-xs-center white--text mt-3 mb-3">
                <div class="subheading">Register for an Event Finder account</div>
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
                    <label class="font-weight-light" for="username">Username:</label>
                    <v-text-field
                        v-model="username"
                        name="username"
                        label="username"
                        color="black"
                        font-weight-light
                        caption
                    ></v-text-field>
                    <p v-if="feedback">{{ feedback }}</p>
                </v-flex>
                <v-flex class="text-xs-center">
                    <v-btn v-on:click="signup">Register</v-btn>
                </v-flex>
            </v-card>
        </v-container>
        <NavigationBottom></NavigationBottom>
    </div>
    
</template>

<script>
import NavigationBottom from '@/components/NavigationBottom'
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            password: null,
            username: null,
            feedback: null,
            slug: null
        }
    },
        components: {
        NavigationBottom
    },
    methods: {
        signup () {
            if(this.username && this.email && this.password) {
                this.slug = slugify(this.username, {
                    replacement: '-',
                    remove: /[!@#$^&%*()+=-[]\/{}:<>,.]/g,
                    lower: true
                })
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    console.log(cred)
                    let ref = db.collection('users').doc(cred.user.uid)
                    ref.set({
                        username: this.username,
                        user_id: cred.user.uid
                    })
                }).then(() => {
                    // this.$store.commit('SET_CURRENT_USER', this.username);
                    this.$router.push({ name: 'welcome'})
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
                this.feedback = 'This username is free to use'
            } else {
                this.feedback = 'You must complete all fields'
            }
        }
    }
}
</script>
