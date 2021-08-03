<template>
  <div class="footers">
    footer
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
.col-4 {
  border: 1px solid #ccc;
}
.footers {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #000;
  color: #ccc;

}
</style>
