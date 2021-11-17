<template>

<div class="modal fade" id="storyModal"  role="dialog"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="littleInfo">
          <div class="user-pic">
            <img :src="avatar" alt="photo">
          </div>
          <div class="user-account">
            <div>限時動態</div>
            <div class="duringTime">{{duringTime}}</div>
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="time-bar row m-0">
        <li v-for="(item, index) in stories.length" :key="index" :style="{'width': 'calc(' + (100-2)/stories.length  + '%)'}"
        :class="[step == index ? 'chosen' : '']"></li>
      </div>
      <div class="modal-body row">
        <div class="container-fluid p-0">
          <div class="stories" v-for="(story, index) in stories" :key="index">
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
import { mapState } from 'vuex';
export default {
  name: 'storyLine',
  data() {
    return{
      step:0
    }
  },
  computed:{
    duringTime() {
      return this.$store.state.duringTime[this.step] 

    },
    ...mapState({
    avatar: state => state.intro.avatar,
    stories: 'stories'
    }),
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

#storyModal .modal-content {
  max-height: 100vh;
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

.time-bar > li {
  margin: 0 auto;
  height: 3px;
  list-style: none;
  background-color: gray;
}

.time-bar > li.chosen {
  background-color: rgba(199, 197, 197, 0.767);
}

/* .modal-body .stories{
  max-height: 100vh;
} */

.stories > img, video{
  max-width: 100%;
  max-height: 100%;
  object-fit:cover;
}


@media screen and (max-width:576px) {
  .modal-fullscreen-sm-down {
  height:auto
  }
}

</style>
