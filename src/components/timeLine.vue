<template>

<div class="modal fade" id="photoModal"  role="dialog"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-fullscreen-sm-down" role="document">
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
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="photoLeft">
            <img :src="$store.state.eventData.photo" alt="photo">  
          </div>
          <div class="symbol">
            <fa class="heart" :icon="['far', 'heart']" />
            <fa class="comment" :icon="['far', 'comment']" @click="showTextarea" />
          </div>
          <div class="like">
            {{$store.state.eventData.like}} likes
          </div>
          <div class="caption">
            {{$store.state.eventData.caption}}
          </div>
          <hr>
          <div class="comments">
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
            <div class="error-msg" :class="[$store.state.errorMessage ? 'open' : '']">
              <div class="alert alert-danger">{{$store.state.errorMessage}}</div>
            </div>
            <textarea name="description" id="description"  placeholder="請輸入文字..."  v-model="newComment"></textarea>
            <div class="buttons">
              <button class="create" @click="postComment">comment</button>
              <button class="cancel" @click="close">cancel</button>
            </div>
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
      newClass:'new',

    }
  },

  computed: {

    newComment:{
      get() {
        return this.$store.state.commentInfo;
      },

      set(value) {
        this.$store.commit('createComment', value);
      },
    }

  },


  methods: {

    //delete & cancel

    edit(index) {
      this.$store.commit('editMode', index)
    },

    deleteComment(comment) {
      this.$store.dispatch('deleteComment', comment)
      console.log(comment.id)
    },

    cancel() {
      this.$store.commit('cancel')
    },

    //comment & cancel

    showTextarea() {
      this.$store.commit('openTextarea')
    },

    close() {
      this.$store.commit('closeTextarea')
    },

    postComment() {
      this.$store.dispatch('postComment')     
    }



  },
  created() {
    this.$store.commit('cancel')


  },
  mounted() {
    

  },

      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#photoModal {
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

.modal-body {
  display: flex;
}

.photoLeft {
  padding-bottom: 8px;
}

.symbol {
  font-size: 18px;
}

.symbol .comment {
  margin-left: 8px;
  cursor: pointer;
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

#text-panel .error-msg {
    display: none;
}

#text-panel .error-msg.open {
    display: block;
    text-align: center;
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
}

/* .comments.edit button.cancel, .comments.edit button.delete {
    display: block;
    width: 50%;
    float: left;
} */

.originComments.edit button.delete {
    /* width: 100%; */
    background: #c21717;
}

#text-panel.new button.create, #text-panel.update button.create, #text-panel.update button.update {
    background: #74be00;
    border-radius: 45px;
}








</style>
