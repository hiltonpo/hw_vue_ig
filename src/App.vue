<template>
  <userProfile ></userProfile>
  <!-- <story></story> -->
  <footers ></footers>
  <!-- <timeLine v-if="$store.state.showModal"></timeLine> -->


</template>

<script>
import userProfile from './components/userProfile.vue'
// import story from './components/story.vue'
import footers from './components/footers.vue'
// import timeLine from './components/timeLine.vue'

export default {
  name: 'App',
  components: {
    userProfile,
    // story,
    footers,
    // timeLine,
  },
  data() {
    return{

    }
  },
  methods:{

  },
  created() {
    // this.$store.dispatch('accessCode')
    this.$store.dispatch('accessToken')
  }
}
</script>

<style>
body {
  height: 100%;
  padding-right: 0 !important
}



</style>
