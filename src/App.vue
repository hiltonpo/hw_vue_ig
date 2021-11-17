<template>
  <loadPage v-if="!accessToken"></loadPage>
  <userProfile v-if="accessToken" ></userProfile>
  <footers v-if="accessToken"></footers>
</template>

<script>
import { mapState } from 'vuex'
import loadPage from './components/loadPage.vue'
import userProfile from './components/userProfile.vue'
import footers from './components/footers.vue'

export default {
  name: 'App',
  components: {
    loadPage,
    userProfile,
    footers,
  },
  computed:mapState({
    accessToken:'accessToken',

  }),

  created() {
    this.$store.dispatch('accessCode'); 
  },
}
</script>

<style>
body {
  height: 100%;
  padding-right: 0 !important;
}
</style>
