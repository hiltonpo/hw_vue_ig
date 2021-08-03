<template>
  <div id="header">
    <div class="account">
      hiltonpopo
      <fa class="plus" :icon="['fas', 'plus']" />
      <fa class="bars" :icon="['fas', 'bars']" />
    </div>
  </div>
  <div id="user">
    <div class="user container-fluid row m-0">
      <div class="item-info col-3" v-for="(num, index) in itemInfo" :key="index">{{num}}</div>
      <div class="item-name col-3" v-for="(item, index) in itemName" :key="index">{{item}}</div>
      
      <!-- <div class="col-3">
        <p>avatar</p>
        <p>200</p>
      </div>
      <div class="col-3">
        <div>22222</div>
        <div class="post">貼文</div>
      </div>
      <div class="col-3">f</div>
      <div class="col-3">fo</div> -->
    </div>
    <div class="personal-info container-fluid row">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas voluptatum
      distinctio totam alias explicabo cupiditate necessitatibus maxime eveniet
      nemo? Harum ea excepturi quis dolores, placeat eaque delectus beatae
      tempore sit non quo quas, reiciendis optio incidunt ipsam voluptate, quae
      cum!
    </div>
    <div class="edit-personal">編輯個人檔案</div>
    
  </div>
</template>

<script>
export default {
  name: "userProfile",
  props: {},
  data() {
    return {
      itemName:[null, '貼文', '粉絲', '追蹤中'],
      itemInfo:[null, '200', '300', '400'],
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  float: left;
}

li {
  display: inline-block;
}


.personal-info {
  margin: 0;
  padding-right: 25px;
  padding-left: 25px;
}

.col-3 {
  padding-left: 0;
  align-self: center;
  text-align: center;
}

.item-name {
  line-height: 0.7;
  padding-bottom: 50px;
}

.item-info {
  font-size: 18px;
}

.edit-personal {
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 10px 25px 15px 25px;
}
</style>
