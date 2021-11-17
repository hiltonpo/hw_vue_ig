<template>
  <div class="load">
    LOADING, PLEASE WAIT
    <div class="loader"></div>
  </div>


</template>

<script>
export default {
  name: 'loadPage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.load {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 25px;
}

.loader {
  width:26px;
  height:26px;
  margin-left:10px;
  border-radius:50%;
  border:6px solid #d8d8d8;
  border-top:6px solid #d8d8d8;
  border-bottom:6px solid white;
  animation:load 1s linear infinite;
}

@keyframes load {
  0%   { transform: rotate(0deg); }
  100% { transform:rotate(360deg); }
}

</style>
