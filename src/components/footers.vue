<template>
  <div class="footers">
    <div><fa  :icon="['fas', 'house-user']" /></div>
    <div><fa  :icon="['fas', 'search']" /></div>
    <div><fa  :icon="['fas', 'plus-square']" /></div>
    <div><fa  :icon="['fas', 'shopping-bag']" /></div>
    <div><fa  :icon="['fas', 'user-circle']" /></div>
  </div>

</template>

<script>
export default {
  name: 'footers',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footers {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #ccc;
}

div {
  flex:1 ;
  align-items: center;
  text-align: center;
  font-size: 18px;
}

</style>
