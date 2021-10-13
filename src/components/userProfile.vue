<template>
  <div id="header">
    <div class="account">
      <div class="name">
        <p>{{$store.state.intro.username}}
          <i>9+</i>
        </p>
      </div>
      <div class="symbols">
        <fa class="plus" :icon="['fas', 'plus']" />
        <fa class="bars" :icon="['fas', 'bars']" />
      </div>
    </div>
  </div>
  <div id="user">
    <div class="user container-fluid row m-0">
      <div class="avatar col-3" >
        <img :src="$store.state.intro.avatar" alt="avatar" data-bs-toggle="modal" data-bs-target="#storyModal"
        :class="[$store.state.stories ? 'story' : '']">
      </div>
      <div class="item col-9">
        <div class="item-info" v-for="(item, index) in itemInfo" :key="index">
          {{item.value}} <br>
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="personal-info container-fluid row">
      {{$store.state.intro.name}}
      <br>
      {{$store.state.intro.biography}}
    </div>
    <div class="edit-personal">編輯個人檔案</div>
    <album></album>
    <storyLine></storyLine>
    
  </div>
</template>

<script>
import album from './album.vue'
import storyLine from './storyLine.vue'
export default {
  name: "userProfile",
  components: {
    album,
    storyLine,
  },
  props: {},
  data() {
    return {
      itemInfo:[
        {
          title:'貼文',
          value:''
        },
        {
          title:'粉絲',
          value:'',
        },
        {
          title:'追蹤中',
          value:''
        }
      ],


    }
  },
  methods:{

  },
  mounted() {
    this.$store.dispatch('basicInfos', this.itemInfo);
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  padding: 15px 24px;
}

.account {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
}

.name p i {
  display: inline-block;
  width: 20px;
  text-align: center;
  font-size: 12px;
  color:white;
  background-color: red;
  border-radius: 40%;
}

.account > .symbols > :first-child {
  margin-right: 15px;
}



.avatar {
  display: flex;
  justify-content: center;
}

.avatar > img{
  width: 90px;
  border-radius: 50%;
}

.avatar >img.story {
  padding: 2px;
  border: 2px solid red;
  cursor: pointer;
}

.item {
  display: flex;
  text-align: center;
}


.item > .item-info {
  display: inline-flex;
  flex:0 0 33%;
  justify-content: center;
  align-self: center;
  line-height: 1.1;
  font-size: 15px;
}

.personal-info {
  margin: 0;
  padding-top: 10px;
}

.edit-personal {
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 10px 25px 15px 25px;
}
</style>
