<template>
    <div id="welcome">
        <v-container>
            <v-card>
                <v-card-title>
                    <h2>Welcome</h2>

                    <v-form ref="form">
                        <input type="text" v-model="name" placeholder="enter name"/>
                        <p v-if="feedback">{{ feedback }}</p>
                        <v-btn v-on:click.prevent="enterChat">Enter Chat</v-btn>
                     </v-form>
                </v-card-title>
            </v-card>
        </v-container>
    </div>
</template>

<script>

export default {
    name: 'welcome',
    data () {
        return {
            name: null,
            feedback: null
        }
    },
    methods: {
        enterChat() {
            if(this.name){
                this.$router.push({ name: 'live-chat', params: { name: this.name}})
            } else {
            this.feedback = 'You must enter a name to join'
            }
        }
    }
}
</script>

<style>
</style>