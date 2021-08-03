<template>
  <userProfile></userProfile>
  <story></story>
  <album></album>
  <footers></footers>

</template>

<script>
import userProfile from './components/userProfile.vue'
import story from './components/story.vue'
import album from './components/album.vue'
import footers from './components/footers.vue'

export default {
  name: 'App',
  components: {
    userProfile,
    album,
    story,
    footers,
  }
}
</script>

<style>
body {
  height: 100%;
}

</style>
