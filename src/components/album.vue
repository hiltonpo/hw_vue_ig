<template>
  <div class="control-row">123</div>
  <div class="albums container-fluid row">
    <div class="col-4">1</div>
    <div class="col-4">2</div>
    <div class="col-4">3</div>
  </div>

</template>

<script>
export default {
  name: 'album',
  props: {
    msg: String
  },
  data() {
    return{

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-4 {
  border: 1px solid #ccc;

}

.control-row {
  height: 40px;
  background-color: #000;
}


.albums {
  overflow: auto;
  height: 900px;
}
</style>
