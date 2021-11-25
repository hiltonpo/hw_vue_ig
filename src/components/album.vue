<template>
  <div class="switch-row row"  ref="switch" :class="{fixed: active}">
    <div class="posts col-6" @click="switchModel(1)">
      <fa class="posts" :icon="['fas', 'th']" />
    </div>
    <div class="tag col-6" @click="switchModel(2)">
      <fa class="tag" :icon="['fas', 'user-tag']" />
    </div>
  </div>
  <div class="albums container-fluid row" v-if="toggle == 1">
    <div class="photos" v-for="(item, index) in photos" :key="index" @click="photoLine(item, index)">
      <div class="postImg" :style="{'background-image': 'url(' + item + ')'}" data-bs-toggle="modal" data-bs-target="#photoModal"></div>
        <!-- <img :src="item" alt="photos" data-bs-toggle="modal" data-bs-target="#photoModal"> -->
    </div>
  </div>
  <div class="mentions container-fluid row" v-if="toggle == 2">
    <div class="tagPhotos" v-for="(item, index) in tagPhotos" :key="index"  @click="photoLine(item, index)">
      <div class="tagImg" :style="{'background-image': 'url(' + item + ')'}" data-bs-toggle="modal" data-bs-target="#photoModal"></div>
        <!-- <img :src="item" alt="tagPhotos" data-bs-toggle="modal" data-bs-target="#photoModal"> -->
    </div>
    <div class="test"></div>
  </div>
  <timeLine></timeLine>
</template>

<script>
import {mapState} from 'vuex'
import timeLine from './timeLine.vue'
export default {
  name: 'album',
  components:{
    timeLine
  },
  data() {
    return{
      active:false,
      toggle: 1,
    }
  },
  computed: mapState({
    photos:'photos',
    tagPhotos:'tagPhotos',
  }),
  methods: {
    scroll() {
      let yposistion = this.$refs.switch.getBoundingClientRect().top + window.scrollY;
      this.active = window.scrollY >= yposistion ? true : false;
    },

    switchModel(toggle) {
      this.toggle = toggle;
    },

    photoLine(currentItem, index) {
      if (this.toggle == 1 ){
        this.$store.commit('createModal', {currentItem, index});
        // this.$store.dispatch('readComment')
        this.$store.dispatch('readReply')
      } else {
        this.$store.commit('createTagModal', {currentItem, index});
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.scroll);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
.switch-row {
  height: 40px;
  background-color: #fff;
}

.switch-row > .posts, .switch-row > .tag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.switch-row > .posts:hover, .switch-row > .tag:hover {
  border-bottom: 2px solid black;
}

.albums {
  margin: 0 auto;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.photos, .tagPhotos {
  width: 33.3%;  
  height: auto;
  padding: 0;
  border-bottom:1px solid #fff;
  border-right: 1px solid #fff;
}
/* 
.photos > img, .tagPhotos > img {
  width: 100%;
  height: 100%;
  object-fit:cover;

}

.photos > img:hover, .tagPhotos > img:hover {
  filter: brightness(70%);
} */

.fixed {
  position: sticky;
  top: 0;
  z-index:1;
}

.postImg, .tagImg{
  padding-bottom: 100%;
  background-size: cover;
}

.postImg:hover {
  filter: brightness(70%);
}
</style>
