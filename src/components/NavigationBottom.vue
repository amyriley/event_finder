<template>
  <div>
    <v-container class="mb-5">
      <v-bottom-nav
        :value="true"
        fixed
        dark
        flat
      >
        <v-btn dark :to="{ name: 'home'}">
          <span>Home</span>
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn dark :to="{ name: 'login'}">
          <span>Chat</span>
          <v-icon>chat</v-icon>
        </v-btn>

        <v-btn dark @click="$router.go(-1)">
          <span>Back</span>
          <v-icon>chevron_left</v-icon>
        </v-btn>

      </v-bottom-nav>
    </v-container>
  </div>
</template>

<script>

export default {
    name: 'navigation-bottom',
}
</script>