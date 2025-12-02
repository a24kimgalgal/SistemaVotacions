<template>
  <v-app>

    <v-app-bar :elevation="2" color="indigo">
      <v-app-bar-title>Sistema de Votacions</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn to="/">Inici</v-btn>
    <v-btn to="/votacions">Votacions</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
