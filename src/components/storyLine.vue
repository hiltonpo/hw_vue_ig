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
            <div class="duringTime">{{$store.state.duringTime}}</div>
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

          <div class="stories" v-for="(story, index) in $store.state.stories" :key="index">
            
            <img :src="story.media_url" alt="photo" v-if="story.media_type == 'IMAGE'" v-show="$store.state.step===index" @click.capture="changeStory()">
            <video controls :poster="story.thumbnail_url" v-else  v-show="$store.state.step===index" @click.capture="changeStory()">
              <source :src="story.media_url"> 
            </video>
          </div>
          <!-- <div class="symbol">
            <fa class="heart" :icon="['far', 'heart']" />
            <fa class="comment" :icon="['far', 'comment']" @click="showTextarea" />
          </div>
          <div class="like">
            {{$store.state.eventData.like}} likes
          </div>
          <div class="caption">
            {{$store.state.eventData.caption}}
          </div>
          <hr> -->
          <!-- <div class="comments">
            <div class="originComments edit clearfix"  v-for="(comment, index) in $store.state.comments[$store.state.eventID]" :key="index"
            @click.prevent="edit(index)">
              
              <div class="visitor d-flex">
                <div class="commentUser ">{{comment.username}}</div>
                <div class="text ">{{comment.text}}</div>
              </div>

              <div class="reply" v-if="comment.replies!=null">
                <div class="replyUser d-flex">
                  <div class="user-pic">
                    <img :src="$store.state.intro.avatar" alt="photo">
                  </div>
                  <div class="user-account">
                    hiltonpopo
                    <div class="text">
                      {{comment.replies.data[0]["text"]}}             
                    </div>
                  </div>
                </div>
              </div>
              <div class="editButtons" v-if="$store.state.activeComment == index && !$store.state.isTextarea">
                <button class="delete" @click.stop="deleteComment(comment)">delete</button>
                <button class="cancel" @click.stop="cancel">cancel</button>
              </div>

            
            </div>

          </div>

          <div id="text-panel" :class="newClass"  v-if="$store.state.isTextarea">
            <textarea name="description" id="description"  placeholder="請輸入文字..."  v-model="newComment"></textarea>
            <div class="buttons">
              <button class="create" @click="postComment">comment</button>
              <button class="cancel" @click="close">cancel</button>
            </div>
          </div> -->



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
      
    }
  },

  computed: {
    // aaa() {
    //   let bbb = JSON.parse(JSON.stringify(this.$store.state.stories))
    //   console.log(bbb[0][0])
    //   return bbb
    // }

    

  


    // calTime:{
    //   get() {
    //     var postTime = {
    //       hr: new Date(this.$store.state.stories[this.step].timestamp).getHours(),
    //       min: new Date(this.$store.state.stories[this.step].timestamp).getMinutes(),
    //       sec: new Date(this.$store.state.stories[this.step].timestamp).getSeconds(),
    //     }

    //     if (this.nowTime[0]>postTime[0]) {
    //       this.duringTime = this.nowTime[0] - postTime[0] + '小時';

    //     } else if (this.nowTime[0]==postTime[0] && this.nowTime[1]>postTime[1]) {
    //       this.duringTime = this.nowTime[1] - postTime[1] + '分';

    //     } else if (this.nowTime[0]==postTime[0] && this.nowTime[1]==postTime[1]) {
    //       this.duringTime = this.nowTime[2] - postTime[2] + '秒';
    //     } else {
    //       this.duringTime = this.nowTime[0] - postTime[0] + 24 + '小時';
    //     };

    //     return this.postTime

    //   },

    //   set(value) {
    //     this.duringTime = value

    //   }
    // }


    // newComment:{
    //   get() {
    //     return this.$store.state.commentInfo;
    //   },

    //   set(value) {
    //     this.$store.commit('createComment', value);
    //   },
    // }

  },


  methods: {

    // calTime() {
    //   this.$store.commit('calStoryTime')
    // },



    // calTime() {
    //   var postTime = {
    //       hr: new Date(this.$store.state.stories[this.step].timestamp).getHours(),
    //       min: new Date(this.$store.state.stories[this.step].timestamp).getMinutes(),
    //       sec: new Date(this.$store.state.stories[this.step].timestamp).getSeconds(),
    //     }

    //     if (this.nowTime[0]>postTime[0]) {
    //       this.duringTime = this.nowTime[0] - postTime[0] + '小時';

    //     } else if (this.nowTime[0]==postTime[0] && this.nowTime[1]>postTime[1]) {
    //       this.duringTime = this.nowTime[1] - postTime[1] + '分';

    //     } else if (this.nowTime[0]==postTime[0] && this.nowTime[1]==postTime[1]) {
    //       this.duringTime = this.nowTime[2] - postTime[2] + '秒';
    //     } else {
    //       this.duringTime = this.nowTime[0] - postTime[0] + 24 + '小時';
    //     };
    // },

    changeStory() {
      if (this.$store.state.step < (this.$store.state.storyIDs.length-1) ) {
        this.$store.state.step++
      }

      this.$store.commit('calStoryTime', this.$store.state.step)

      console.log(this.$store.state.step)
    },

    close() {
      setTimeout(() => {
        this.$store.state.step = 0
        this.$store.commit('calStoryTime', this.$store.state.step)
      }, 1000)
      

    }




  },
  created() {
    this.$store.dispatch('stories');
    // this.calTime()
    this.close()
    
  },
  mounted() {

    
    
    

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

/* .symbol .heart {
  margin-right: 8px;
}

.like {
  padding-bottom: 10px;
  font-weight: bold;
} */

.stories > img, video{
  width: 100%;
  height: 100%;
  object-fit:cover;
}

/* .caption {
  white-space: pre-wrap;
}

.originComments {
  cursor: pointer;
}


.originComments .commentUser {
  font-weight: bold;
  margin-right: 8px;
}

.originComments .text {
  display: contents;
}

.originComments .reply {
  margin: 10px;
}


.originComments .user-pic > img {
  display: flex;
  align-items: center;
  width: 20px;
  border-radius: 50%;
}

#text-panel textarea {
  width: 100%;
  margin-top: 20px;
}

#text-panel button , .originComments button {
    display: none;
    border: none;
    padding: 10px;
    background: rgba(129, 127, 127, 0.747);
    color: white;
    cursor: pointer;
}

#text-panel.new button.create, #text-panel.new button.cancel, .originComments.edit button.delete, .originComments.edit button.cancel {
    margin-top: 5px;
    display: block;
    width: 50%;
    border-radius: 45px;
    float: left;
} */

/* .comments.edit button.cancel, .comments.edit button.delete {
    display: block;
    width: 50%;
    float: left;
} */

@media screen and (max-width:576px) {
  .modal-fullscreen-sm-down {
  height:auto
}
}












</style>
