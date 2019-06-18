<template>
    <div id="live-chat">
        <v-container>
            <h2>Event Finder Chat</h2>
            <v-card>
                <v-layout>
                    <ul class="messages">
                        <li v-for="message in messages" :key="message.id">
                            <div>{{ message.name }}</div>
                            <div>{{ message.content }}</div>
                            <div>{{ message.timestamp }}</div>
                        </li>
                    </ul>
                </v-layout>
                <v-card-actions>
                    <NewMessage :name="name"></NewMessage>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'

export default {
    name: 'live-chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data () {
        return {
            messages: []
        }
    },
    created() {
        let ref = db.collection('messages').orderBy('timestamp')

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp
                    })
                }
            })
        })
    }
}
</script>

<style>
</style>