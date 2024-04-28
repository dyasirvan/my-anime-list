<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title style="cursor: pointer" @click="goToHome">My Anime List</v-toolbar-title>
      </div>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
    goToHome(){
      this.$router.push({name: 'home'})
    }
  }
};
</script>
