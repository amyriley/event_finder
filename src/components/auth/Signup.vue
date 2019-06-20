<template>
    <div id="signup">
        <v-container>
            <v-card>
                <div class="display-1 ma-3">Signup</div>
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
                <v-btn v-on:click.prevent="signup">Signup</v-btn>
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
                // let ref = db.collection('users').doc(this.slug)
                    // if(doc.exists) {
                    //     this.feedback = 'This username already exists'
                    // } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            console.log(cred)
                            let ref = db.collection('users').doc(cred.user.uid)
                            ref.set({
                                username: this.username,
                                user_id: cred.user.uid
                            })
                        }).then(() => {
                            this.$router.push({ name: 'welcome'})
                        })
                        .catch(err => {
                            console.log(err)
                            this.feedback = err.message
                        })
                        this.feedback = 'This username is free to use'
            
                console.log(this.slug)
            } else {
                this.feedback = 'You must complete all fields'
            }
        }
    }
}
</script>
