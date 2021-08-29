<template>

<div class="modal fade" id="photoModal"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-fullscreen-sm-down">
    <div class="modal-content">
      <div class="modal-header">
        <div class="littleInfo">
          <div class="user-pic">
            <img :src="$store.state.intro.avatar" alt="photo">
          </div>
          <div class="user-account">
            hiltonpopo
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="photoLeft">
            <img :src="$store.state.eventData.photo" alt="photo">  
          </div>
          <div class="symbol">
            <fa class="heart" :icon="['far', 'heart']" />
            <fa class="comment" :icon="['far', 'comment']" />
          </div>
          <div class="like">
            {{$store.state.eventData.like}} likes
          </div>
          <div class="caption">
            {{$store.state.eventData.caption}}
          </div>
          <div class="comments">
            123
          </div>
        </div>

      </div>
    </div>
  </div>
</div>



</template>

<script>

export default {
  name: 'timeLine',
  props: {
    
  },
  data() {
    return{


    }
  },
  methods: {



  },
  created() {

  },
  mounted() {

  },

      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.littleInfo {
  display: flex;
}

.littleInfo .user-pic > img{
  width: 40px;
  border-radius: 50%;
}

.littleInfo .user-account {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.modal-body {
  display: flex;
}

.photoLeft {
  padding-bottom: 8px;
}

.symbol .heart {
  margin-right: 8px;
}

.like {
  padding-bottom: 10px;
  font-weight: bold;
}

.photoLeft > img {
  width: 100%;
  height: 100%;
  object-fit:cover;
}

.caption {
  white-space: pre-wrap;
}







</style>
