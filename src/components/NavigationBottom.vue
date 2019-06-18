<template>
  <v-card height="200px">
    <v-bottom-nav
      :value="true"
      fixed
      dark
      shift
    >
      <v-btn dark :to="{ name: 'home'}">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn dark @click="$router.go(-1)">
        <span>Back</span>
        <v-icon>chevron_left</v-icon>
      </v-btn>

      <v-btn dark :to="{ name: 'welcome'}">
        <span>Chat</span>
        <v-icon>chat</v-icon>
      </v-btn>

    </v-bottom-nav>
  </v-card>
</template>

<script>

export default {
    name: 'navigation-bottom',
}
</script>