<template>
  <userProfile ></userProfile>
  <footers ></footers>
</template>

<script>
import userProfile from './components/userProfile.vue'
import footers from './components/footers.vue'

export default {
  name: 'App',
  components: {
    userProfile,
    footers,
  },
  data() {
    return{

    }
  },
  methods:{

  },
  created() {
    this.$store.dispatch('accessCode'); 
  },

}
</script>

<style>
body {
  height: 100%;
  padding-right: 0 !important
}



</style>
