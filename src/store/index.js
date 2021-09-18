import { createStore } from 'vuex'
import axios from 'axios';


export default createStore({
  state: {
    rowData:[],
    rowTagData:[],
    intro:{
      username:null,
      avatar:null,
      name:null,
      biography:null,
    },

    photos:[],
    tagPhotos:[],

    showModal:false,
    eventID:null,
    eventInfo:{
      postID:null,
      photo:null,
      like:null,
      caption:null,
    },
    eventData:[],

    // isEdit:true,
    isTextarea:false,
   
    activeComment:[],
    comments:[],
    commentInfo:[],



  },
  mutations: {
    
    photoInfos(state) {
      state.rowData.forEach(photo => {
        state.photos.push(photo.media_url);    
      });

      
    },

    tagPhotoInfos(state, tagPhoto) {
      tagPhoto.forEach(tagPhoto => {
        state.tagPhotos.push(tagPhoto.media_url);
        
      });
    },

    createModal(state, {currentItem, index}) {
      state.showModal = true; 
      state.eventID = index;
      state.eventInfo.photo = currentItem;
      state.eventInfo.postID = state.rowData[state.eventID].id;
      state.eventInfo.caption = state.rowData[state.eventID].caption;
      state.eventInfo.like = state.rowData[state.eventID].like_count;

      state.eventData = Object.assign([], state.eventInfo);
      console.log(state.eventData);
      // state.currentData.photo = currentItem;
      // state.currentData.caption = Object.assign([], state.rowData[state.modalID].caption);
      // state.currentData.like = state.rowData[state.modalID].like_count
    },

    createTagModal(state, {currentItem, index}) {
      state.showModal = true; 
      state.eventID = index;
      state.eventInfo.photo = currentItem;
      state.eventInfo.postID = state.rowData[state.eventID].id;
      state.eventInfo.caption = state.rowTagData[state.eventID].caption;
      state.eventInfo.like = state.rowTagData[state.eventID].like_count;

      state.eventData = Object.assign([], state.eventInfo);
      console.log(state.eventData);
    },
    
    // read comments in post (front-end)
    getComments(state, comments) {
      // order by time in comments
      const orderByTime_comments = comments.sort((a, b) => {
        return a.timestamp > b.timestamp ? 1 : -1;
      })
      // put ordered comments in post
      state.comments[state.eventID] = Object.assign([], orderByTime_comments);
      console.log(state.comments);
      console.log(state.eventID);

    },

    // show the create comments immediately in post
    putComments(state, id) {
      if (state.comments[state.eventID].length == 0) {
        var newOrder = 0; 
        state.comments[state.eventID][newOrder] = {
          "id": id.id,
          "username":"hiltonpopo", 
          "text":state.commentInfo, 
          "like_count": 0,
        };
      }
      else {
        var plusOrder = state.comments[state.eventID].length;  
        state.comments[state.eventID][plusOrder] = {
          "id": id.id,
          "username":"hiltonpopo", 
          "text":state.commentInfo, 
          "like_count": 0,
        };
      }
      console.log(state.comments)
    },

    // remove the create comments immediately in post
    removeComments(state) {
      state.comments[state.eventID].splice(state.activeComment, 1);
    },

    //use in Vuex strict mode
    createComment(state, newComment) {
      state.commentInfo = newComment;
    },

    editMode(state, index) {
      state.activeComment = index;
      console.log(state.activeComment)

    },

    cancel(state) {
      state.activeComment = null;
      console.log(state.activeComment)
    },


    openTextarea(state) {
      state.isTextarea = !state.isTextarea;
      state.commentInfo= [];
    },

    closeTextarea(state) {
      state.isTextarea = false;
      state.activeComment = null;
    },

    closeEditMode(state) {
      state.activeComment = null;
    }

  },
  actions: {
    // basic information including username, follower, posts... (back-end)
    basicInfos({commit, state}, itemInfo) {
      axios.post('http://localhost:8080/demo_hw/vue_ig/API/business_discovery.php',
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data)
        let posts = response.data.business_discovery.media_count;
        let followers = response.data.business_discovery.followers_count;
        let follows = response.data.business_discovery.follows_count;
        
        state.rowData = response.data.business_discovery.media.data
        state.intro.username = response.data.business_discovery.username;
        state.intro.avatar = response.data.business_discovery.profile_picture_url;
        state.intro.name = response.data.business_discovery.name;
        state.intro.biography = response.data.business_discovery.biography;

        itemInfo[0].value = posts;
        itemInfo[1].value = followers;
        itemInfo[2].value = follows;
        commit('photoInfos');
      })
      .catch(error => {
        console.log(error);
      });
    },

    //tag photo information (back-end)
    tagInfos({commit, state}) {
      axios.post('http://localhost:8080/demo_hw/vue_ig/API/mentions.php',
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data);
        state.rowTagData = response.data.data;
        commit('tagPhotoInfos', state.rowTagData);
      })
      .catch(error => {
        console.log(error);
      });

    },
    // readUI for comments (back-end)
    readComment({commit, state}) {
      axios.post('http://localhost:8080/demo_hw/vue_ig/API/comment.php',
      {mediaID: state.eventInfo.postID}, 
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        commit('getComments', response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });

    },

    //createUI for comments (back-end)
    postComment({commit, state}) {
      axios.post('http://localhost:8080/demo_hw/vue_ig/API/createcomment.php',
      {mediaID: state.eventData.postID,
      message:state.commentInfo}, 
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        commit('putComments', response.data)
        // dispatch('readComment')
        console.log(response.data);
        commit('closeTextarea')
        
      })
      .catch(error => {
        console.log(error);
      });
    },
    
    //deleteUI for comments (back-end)
    deleteComment({commit}, comment) {
      axios.post('http://localhost:8080/demo_hw/vue_ig/API/deletecomment.php',
      {commentID: comment.id}, 
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        // this.dispatch('readComment')
        commit('removeComments')
        commit('closeEditMode')
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    },


  },
  modules: {
  }
})
