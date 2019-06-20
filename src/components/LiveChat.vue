<template>
    <div id="live-chat">
        <v-container>
            <v-layout>
                <v-flex xs12>
                    <v-content class="white--text">
                        <div class="chat-title mb-5 text-xs-center">Event Finder Chat</div>
                        <v-card class="messages-background">
                            <v-layout>
                                <v-content class="messages ml-3" v-chat-scroll>
                                    <div v-for="message in messages" :key="message.id">
                                        <span prepend-icon="face" class="font-weight-bold mr-2 body-2">{{ message.name }}</span>
                                        <span prepend-icon="face" class="font-weight-bold mr-2 body-2">{{ message.user }}</span>
                                        <span class="subheading">{{ message.content }}</span>
                                        <span class="caption font-weight-light mb-4">{{ message.timestamp }}</span>
                                    </div>
                                </v-content>
                            </v-layout>
                            <v-card-actions>
                                <NewMessage :usernameDisplay="usernameDisplay"></NewMessage>
                            </v-card-actions>
                        </v-card>
                    </v-content>
                </v-flex>
            </v-layout>
        </v-container>
        <NavigationBottom></NavigationBottom>
    </div>
</template>

<script>
import NavigationBottom from '@/components/NavigationBottom'
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'live-chat',
    props: ['usernameDisplay'],
    components: {
        NewMessage,
        NavigationBottom
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
                        timestamp: moment(doc.data().timestamp).format('lll'),
                        username: doc.data().username
                    })
                }
            })
        })
    },
    methods: {
        moment
    }
}
</script>

<style scoped>

.messages {
    overflow: auto;
}

@media (max-width: 400px) {
    .messages {
        height: 300px;
    }
    .chat-title {
        font-size: 1.5em;
    }

}

@media (min-height: 1024px) {
    .messages {
        height: 700px;
    }
    .chat-title {
        font-size: 2em;
    }
    .messages-background {
        margin: 50px;
    }
}

.caption {
    display: block;
}

</style>