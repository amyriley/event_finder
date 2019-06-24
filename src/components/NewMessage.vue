<template>
    <div class="new-message">
        <label class="font-weight-light" for="new-message">New message:</label>
        <v-text-field
            v-model="newMessage"
            name="new-message"
            label="type here"
            color="black"
            font-weight-light
            caption
            prepend-icon="face"
        ></v-text-field>
        <v-btn v-on:click.prevent="addMessage">Send</v-btn>
        <p v-if="feedback">{{ feedback }}</p>
    </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'
import Welcome from '@/components/Welcome'
import LiveChat from '@/components/LiveChat'
import { mapState } from 'vuex'

export default {
    name: 'NewMessage',
    props: ['name', 'usernameDisplay'],
    data () {
        return {
            newMessage: null,
            feedback: null
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
    methods: {
        addMessage() {
            if(this.newMessage) {
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.$state.currentUser,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newMessage = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must enter a message in order to send'
            }
        },
        moment
    },
}
</script>

