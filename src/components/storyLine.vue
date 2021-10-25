<template>

<div class="modal fade" id="storyModal"  role="dialog"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-fullscreen-sm-down" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="littleInfo">
          <div class="user-pic">
            <img :src="$store.state.intro.avatar" alt="photo">
          </div>
          <div class="user-account">
            <div>限時動態</div>
            <div class="duringTime">{{$store.state.duringTime[step]}}</div>
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

          <div class="stories" v-for="(story, index) in $store.state.stories" :key="index">
            
            <img :src="story.media_url" alt="photo" v-if="story.media_type == 'IMAGE'" v-show="step===index" @click.capture="changeStory()">
            <video controls :poster="story.thumbnail_url" v-else  v-show="step===index" @click.capture="changeStory()">
              <source :src="story.media_url"> 
            </video>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>



</template>

<script>
export default {
  name: 'storyLine',
  props: {
    
  },
  data() {
    return{
      step:0
      
    }
  },
  methods: {

    changeStory() {
      if (this.step < (this.$store.state.storyIDs.length-1) ) {
        this.step++
      }
      console.log(this.step)
    },

    close() {
      setTimeout(() => {
        this.step = 0
      }, 500)
    }
  },

  created() {
    this.close()
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#storyModal {
  position: fixed;
}

.littleInfo {
  display: flex;
}

.littleInfo .user-pic > img {
  width: 40px;
  border-radius: 50%;
} 

.user-account {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.user-account .duringTime {
  padding-left: 16px;
  color:rgb(160, 153, 153)
}

.modal-body {
  display: flex;
}

.stories {
  padding-bottom: 8px;
}

.stories > img, video{
  width: 100%;
  height: 100%;
  object-fit:cover;
}

@media screen and (max-width:576px) {
  .modal-fullscreen-sm-down {
  height:auto
}
}

</style>
