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



  },
  mutations: {
    
    photoInfos(state) {
      state.rowData.forEach(photo => {
        state.photos.push(photo.media_url)    
      });

      
    },

    tagPhotoInfos(state, tagPhoto) {
      tagPhoto.forEach(tagPhoto => {
        state.tagPhotos.push(tagPhoto.media_url)
        
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
      console.log(state.eventData)
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
      console.log(state.eventData)
    }

  },
  actions: {
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
        commit('photoInfos')
      })
      .catch(error => {
        console.log(error)
      });
    },

    tagInfos({commit, state}) {
      axios.post('http://localhost:8080/demo_hw/vue_ig/API/mentions.php',
      {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data)
        state.rowTagData = response.data.data
        commit('tagPhotoInfos', state.rowTagData)
      })
      .catch(error => {
        console.log(error)
      });

    },
  },
  modules: {
  }
})
