<template>
  <v-app>
    <v-main>
      <HomeComponent/>
    </v-main>
  </v-app>
</template>

<script>
import HomeComponent from './components/Home.vue'

export default {
  name: 'App',
  components: { HomeComponent }
}
</script>
