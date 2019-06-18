<template>
    <div class="new-message">
        <label for="new-message">New Message</label>
        <input type="text" name="new-message" v-model="newMessage">
        <v-btn v-on:click.prevent="addMessage">Enter</v-btn>
        <p v-if="feedback">{{ feedback }}</p>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'NewMessage',
    props: ['name'],
    data () {
        return {
            newMessage: null,
            feedback: null
        }
    },
    methods: {
        addMessage() {
            if(this.newMessage) {
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newMessage = null;
                this.feedback = null;
            } else {
                this.feedback = 'must enter a message in order to send'
            }
        }
    }
}
</script>

