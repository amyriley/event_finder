<template>
  <v-app style="background-color: grey">
    <v-content>
      <div>
      </div>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import apiConfig from '@/apiKeys';
import { mapState } from 'vuex';

export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.currentUser
    })
  },
}
</script>


