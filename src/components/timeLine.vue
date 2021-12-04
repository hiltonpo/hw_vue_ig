<template>

<div class="modal fade" id="photoModal"  role="dialog"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-fullscreen-sm-down" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="littleInfo">
          <div class="user-pic">
            <img :src="avatar" alt="photo">
          </div>
          <div class="avatar-account">
            {{username}}
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="photoLeft">
            <img :src="modalPhoto" alt="photo">  
          </div>
          <div class="symbol">
            <fa class="heart" :icon="['far', 'heart']" />
            <fa class="comment" :icon="['far', 'comment']" @click="showTextarea" />
          </div>
          <div class="like">
            {{like}} likes
          </div>
          <div class="caption">
            {{caption}}
          </div>
          <hr>
          <div class="comments">
            <div class="originComments edit clearfix"  v-for="(comment, index) in comments" :key="index"
            @click.prevent="edit(index)">
              
              <div class="visitor d-flex">
                <div class="commentUser ">{{comment.username}}</div>
                <div class="text ">{{comment.text}}</div>
              </div>

              <div class="reply" v-if="comment.replies!=null" >
                <div class="replyUser d-flex" v-for="(reply, i) in replies" :key="i">
                  <div class="user-account">
                    {{reply.username}}
                  </div>
                  <div class="text">
                    {{reply.text}}
                  </div>
                </div>
              </div>
              <div class="editButtons" v-if="activeComment == index && !isTextarea">
                <button class="delete" @click.stop="deleteComment(comment)">delete</button>
                <button class="cancel" @click.stop="cancel">cancel</button>
              </div>    
            </div>
          </div>

          <div id="text-panel" :class="newClass"  v-if="isTextarea">
            <div class="error-msg" :class="[errorMessage ? 'open' : '']">
              <div class="alert alert-danger">{{errorMessage}}</div>
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
import { mapState } from 'vuex';
export default {
  name: 'timeLine',
  data() {
    return{
      newClass:'new',
    }
  },
  computed:{
    newComment:{
      get() {
        return this.$store.state.commentInfo;
      },
      set(value) {
        this.$store.commit('createComment', value);
      },
    },
    ...mapState({
      avatar: state => state.intro.avatar,
      username: state => state.intro.username,
      modalPhoto: state => state.eventData.photo,
      like: state => state.eventData.like,
      caption: state => state.eventData.caption,
      comments: state => state.comments[state.eventID],
      replies: state => state.replies[state.eventID],
      activeComment: 'activeComment',
      isTextarea: 'isTextarea',
      errorMessage: 'errorMessage',
    })
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

.avatar-account {
  display: flex;
  align-items: center;
  display: flex;
  font-weight: 500;
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
  padding-bottom: 5px;
}

.originComments .commentUser, .reply .user-account {
  font-weight: bold;
  margin-right: 8px;
}

.reply .user-account {
  padding-left: 10px;
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

.originComments.edit button.delete {
    background: #c21717;
}

#text-panel.new button.create, #text-panel.update button.create, #text-panel.update button.update {
    background: #74be00;
    border-radius: 45px;
}
</style>
