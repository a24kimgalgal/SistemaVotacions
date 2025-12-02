<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">

    <h1 class="text-h3 font-weight-bold text-indigo mb-4">
      Benvingut al sistema de votacions!
    </h1>

    <p class="text-h6 text-medium-emphasis mb-8" style="max-width: 600px;">
      Participa en la nostra enquesta en temps real. 
      Tria la teva opció preferida i mira com s'actualitzen els resultats a l'instant.
    </p>

    <v-btn
      color="indigo"
      size="x-large"
      to="/votacions"
      rounded="pill"
      elevation="2"
      prepend-icon="mdi-vote"
    >
      Començar a Votar
    </v-btn>

  </v-container>
</template>

<script setup>
  //
</script>