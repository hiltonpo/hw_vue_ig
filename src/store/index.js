import { createStore } from 'vuex'
import axios from 'axios';





export default createStore({
  state: {

    //album & tags
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

    eventID:null,
    eventInfo:{
      postID:null,
      photo:null,
      like:null,
      caption:null,
    },
    eventData:[],
   
    // comments
    isTextarea:false,
    errorMessage:null,
   
    activeComment:[],
    comments:[],
    commentInfo:[],


    //story
    storyIDs:[],
    stories:null,
    step:0,
    duringTime:null,





  },
  mutations: {
    
    // album & tags
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

    // open posted in album
    createModal(state, {currentItem, index}) {
      state.eventID = index;
      state.eventInfo.photo = currentItem;
      state.eventInfo.postID = state.rowData[state.eventID].id;
      state.eventInfo.caption = state.rowData[state.eventID].caption;
      state.eventInfo.like = state.rowData[state.eventID].like_count;

      state.eventData = Object.assign([], state.eventInfo);
      console.log(state.eventData);
    },

    // open posted in tag
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

    // show the created comments immediately in post
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
      console.log(state.comments);
    },

    // remove the created comments immediately in post
    removeComments(state) {
      state.comments[state.eventID].splice(state.activeComment, 1);
    },

    


    // delete & cancel for comments
    editMode(state, index) {
      state.activeComment = index;
      console.log(state.activeComment);

    },

    cancel(state) {
      state.activeComment = null;
      console.log(state.activeComment);
    },

    closeEditMode(state) {
      state.activeComment = null;
    },

    // commit & cancel for comments 
    createComment(state, newComment) {
      state.commentInfo = newComment;
    },

    openTextarea(state) {
      state.isTextarea = !state.isTextarea;
      state.commentInfo= [];
    },

    closeTextarea(state) {
      state.isTextarea = false;
      state.activeComment = null;
      state.errorMessage = null;
    },

    //story
    //get stories id
    GetStoriesId(state, storyID) {
      var storyIdCount = storyID.length;
      
      for (var i = 0; i<storyIdCount; i++) {
        state.storyIDs[i] = storyID[i].id;
      }

      console.log(state.storyIDs);
    },

    // get stories data 
    putStoryData(state, data) {
      for (let i=0; i<data.length; i++) {
         state.stories[i] = {
          id: data[i].id,
          media_type: data[i].media_type,
          media_url: data[i].media_url,
          timestamp: data[i].timestamp,
        }
      }

      const orderByTime_stories = state.stories.sort((a, b) => {
        return a.timestamp > b.timestamp ? 1 : -1;
      });
      
      state.stories = orderByTime_stories;

      console.log(state.stories);  
      console.log(data);
    },

    // calculate time of stories 
    calStoryTime(state, step) {
      var nowTime = {
        hr:new Date().getHours(),
        min:new Date().getMinutes(),
        sec: new Date().getSeconds(),
      };

      var postTime = {
          hr: new Date(state.stories[step].timestamp).getHours(),
          min: new Date(state.stories[step].timestamp).getMinutes(),
          sec: new Date(state.stories[step].timestamp).getSeconds(),
      };

      if (nowTime['hr']>postTime['hr']) {
        state.duringTime = nowTime['hr'] - postTime['hr'] + '小時';}

        else if (nowTime['hr']==postTime['hr'] && nowTime['min']>postTime['min']) {
        state.duringTime = nowTime['min'] - postTime['min'] + '分';}

        else if (nowTime['hr']==postTime['hr'] && nowTime['min']==postTime['min']) {
        state.duringTime = nowTime['sec'] - postTime['sec'] + '秒';}

        else {
        state.duringTime = nowTime['hr'] - postTime['hr'] + 24 + '小時';}

        console.log(state.duringTime);
        console.log(postTime);
        console.log(nowTime);
    },


  },
  actions: {
    // accessToken() {
    //   axios.get('http://www.facebook.com/v11.0/dialog/oauth?client_id=326560215674441&redirect_uri=https://example.com/&scope=instagram_basic, pages_show_list, pages_read_engagement, instagram_manage_comments, business_management, public_profile, instagram_content_publish, ads_management, instagram_manage_insights'
    //   ,{headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //   //   if (response.status === 302) {
    //   //     window.location.href = response.request.responseURL;
    //   //     console.log(window.location.href)
    //   // }
    //   console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error.request);
    //     if (typeof error.response === 'undefined') {
    //       // location.href = 'http://www.facebook.com/v11.0/dialog/oauth?client_id=326560215674441&redirect_uri=https://example.com/&scope=instagram_basic, pages_show_list, pages_read_engagement, instagram_manage_comments, business_management, public_profile, instagram_content_publish, ads_management, instagram_manage_insights'
    //       console.log(error.request.responseURL)
    //     }
    //   });
    // },

    // accessToken() {
    //   axios.get('api/oauth/access_token?client_id=326560215674441&redirect_uri=https://example.com/&client_secret=66f2c6e3593d41fa78cd473dac4fb0f1&code=AQB6wJLDAu6BvGD2BY-An9V1A0vkQxZRBZLq9iltagw4CFZh-M4l3io2sZVPKz1SthK7_zzeBC5VS7L59ObzYsUafzuAaiafPyX4lUsIDGyUDcC5VNpUsGIAXfId-v077kWCuwukIiogsrS_Sfm7WRQcSn0IK--p2I_b10wBn_wgJu-YQj06kc0c7CIgFHhGqFnt2529PbFxL6GvZLB7BqfJ06KjrSJeIwjS52su8BIduZ4AzIJQwOOp-J9wYY6E_-obW5XXVxpCj3917rSBMD7Wrfezcqla4mZL2yXIBL3hfn5fp1AO8OQ_pV5UFoKxvELUvnPC2TYRAg4Uj9qtGdPRyJQk0CpFY05ZKiT0vU_0Vc_GQ1FvzIAWeYrfCsCA6qA'
    //   ,{headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //   //   if (response.status === 302) {
    //   //     window.location.href = response.request.responseURL;
    //   //     console.log(window.location.href)
    //   // }
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error.request);
    //     // if (typeof error.response === 'undefined') {
    //     //   location.href = 'http://www.facebook.com/v11.0/dialog/oauth?client_id=326560215674441&redirect_uri=https://example.com/&scope=instagram_basic, pages_show_list, pages_read_engagement, instagram_manage_comments, business_management, public_profile, instagram_content_publish, ads_management, instagram_manage_insights'
    //     //   console.log(error.request.responseURL)
    //     // }
    //   });
    // },


    // basic information including username, follower, posts... (back-end)
    basicInfos({commit, state}, itemInfo) {
      axios.get('api/17841400203867081?fields=business_discovery.username(hiltonpopo){username,website,name,ig_id,id,profile_picture_url,biography,follows_count,followers_count,media_count,media{caption,like_count,comments_count,media_url,permalink,media_type,timestamp}}&access_token=EAAEpATmnLkkBAOZCKR5MJDs2lkhWj9VK5iEgL5sW1WHprzihvCdMj6gXhZAZA10gNbW3nHCw0NEvtzYFsSKlVQBpuuTRLRixDzENaFwvZApaVxePcP5IPywmlqvyYpsZC7ma6ohzki8ymf3IpnfcfXMisJmZCIYcxhLzNTg24ZCcVayEFmZAKOJXEKyYyWyWBzaplusQ36tdtKp1rCj8Ay1eszZAaskQNgv0s9kxwXNVF3wZDZD',
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

    // //tag photo information (back-end)
    // tagInfos({commit, state}) {
    //   axios.post('localhost/demo_hw/vue_ig/API/mentions.php',
    //   {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //     console.log(response.data);
    //     state.rowTagData = response.data.data;
    //     commit('tagPhotoInfos', state.rowTagData);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // },
    // // readUI for comments (back-end)
    // readComment({commit, state}) {
    //   axios.post('localhost/demo_hw/vue_ig/API/comment.php',
    //   {mediaID: state.eventInfo.postID}, 
    //   {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //     commit('getComments', response.data.data);
    //     console.log(response.data.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // },

    // //createUI for comments (back-end)
    // postComment({commit, state}) {
    //   axios.post('localhost/demo_hw/vue_ig/API/createcomment.php',
    //   {mediaID: state.eventData.postID,
    //   message:state.commentInfo}, 
    //   {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //     commit('putComments', response.data)
    //     // dispatch('readComment')
    //     console.log(response.data);
    //     commit('closeTextarea')
        
    //   })
    //   .catch(error => {
    //     console.log(error.response.data);
    //     state.errorMessage = error.response.data;
    //   });
    // },
    
    // //deleteUI for comments (back-end)
    // deleteComment({commit}, comment) {
    //   axios.post('localhost/demo_hw/vue_ig/API/deletecomment.php',
    //   {commentID: comment.id}, 
    //   {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //     commit('removeComments');
    //     commit('closeEditMode');
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // },

    // //stories 
    // stories({commit, dispatch}) {
    //   axios.get('localhost/demo_hw/vue_ig/API/story.php',
    //   {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //   .then(response => {
    //     console.log(response.data.data)
    //     commit('GetStoriesId', response.data.data)
    //     dispatch('storiesInfo')
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // },

    // storiesInfo({state, commit}) {
    //   let promises = [];
    //   let storyInfos = [];
    //   for (var i = 0; i<state.storyIDs.length; i++) {
    //     promises.push(
    //       axios.post('localhost/demo_hw/vue_ig/API/storyInfo.php',
    //       {id: state.storyIDs[i]},
    //       {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    //       .then(response => {
    //         storyInfos.push(response.data)
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       })
    //     )
    //   }
    //   Promise.all(promises)
    //   .then(() => {
    //     commit('putStoryData', storyInfos)
    //     commit('calStoryTime', state.step)
    //     console.log(storyInfos)
    //   });
    // },

  },
  modules: {
  }
})
