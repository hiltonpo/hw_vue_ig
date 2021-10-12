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
    <div class="photos" v-for="(item, index) in $store.state.photos" :key="index" @click="photoLine(item, index)">
        <img :src="item" alt="photos" data-bs-toggle="modal" data-bs-target="#photoModal">
    </div>
  </div>
  <div class="mentions container-fluid row" v-if="toggle == 2">
    <div class="tagPhotos" v-for="(item, index) in $store.state.tagPhotos" :key="index"  @click="photoLine(item, index)">
        <img :src="item" alt="tagPhotos" data-bs-toggle="modal" data-bs-target="#photoModal">
    </div>
  </div>
  <timeLine></timeLine>
  

</template>

<script>
import timeLine from './timeLine.vue'
export default {
  name: 'album',
  components:{
    timeLine
  },
  props: {

  },
  data() {
    return{
      active:false,
      toggle: 1,

    }
  },
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
        this.$store.dispatch('readComment')
      } else {
        this.$store.commit('createTagModal', {currentItem, index});
      }
    }

  },
  created() {
    window.addEventListener("scroll", this.scroll);

    // this.$store.dispatch('readComment')

  },
  mounted() {
    this.$store.dispatch('tagInfos')

    // this.$store.dispatch('readComment')
    // axios.post('http://localhost:8080/demo_hw/vue_ig/API/mentions.php',
    // {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    // .then(response => {
    //   console.log(response.data)
    //   this.$store.state.rowTagData = response.data.data
    //   this.$store.commit('tagPhotoInfos', this.$store.state.rowTagData)
    // })
    // .catch(error => {
    //   console.log(error)
    // });
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
  width: calc(100vw/3);
  height: calc(33vw*1.1);
  padding: 0;
  border-bottom:1px solid #fff;
  border-right: 1px solid #fff;
}

.photos > img, .tagPhotos > img {
  width: 100%;
  height: 100%;
  object-fit:cover;

}

.photos > img:hover, .tagPhotos > img:hover {
  filter: brightness(70%);
}

.fixed {
  position: sticky;
  top: 0;
  z-index:1;

}
</style>
