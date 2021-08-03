<template>
  <div class="storys container-fluid row">
    <div class="col-4">1</div>
    <div class="col-4">2</div>
    <div class="col-4">3</div>
  </div>

</template>

<script>
export default {
  name: 'story',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-4 {
  border: 1px solid #ccc;
}
.storys {
  margin: 0 0 10px 0;
}
</style>
