import { createStore } from 'vuex'
import axios from 'axios';





export default createStore({
  state: {
    //fb login & access token
    code:[],
    accessToken:[],
    userID:[],
    igAccountID:[],




    //album & tags
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
    stories:[],
    duringTime:[],
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
    
    // read comments in post 
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

    // get stories data & stories' during time
    putStoryData(state, data) {
      const orderByTime_stories = data.sort((a, b) => {
        return a.timestamp > b.timestamp ? 1 : -1;
      });
      state.stories = orderByTime_stories;

      let nowTime = {
        hr:new Date().getHours(),
        min:new Date().getMinutes(),
        sec: new Date().getSeconds(),
      };

      for (let i=0; i<data.length; i++) {
        state.stories[i] = {
          id: data[i].id,
          media_type: data[i].media_type,
          media_url: data[i].media_url,
          timestamp: data[i].timestamp,
          postTime: {
            hr: new Date(data[i].timestamp).getHours(),
            min: new Date(data[i].timestamp).getMinutes(),
            sec: new Date(data[i].timestamp).getSeconds(),
          }
        };

        if (nowTime['hr']>state.stories[i].postTime['hr']) {
          state.duringTime[i] = nowTime['hr'] - state.stories[i].postTime['hr'] + '小時';}
  
          else if (nowTime['hr'] == state.stories[i].postTime['hr'] && nowTime['min'] > state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['min'] - state.stories[i].postTime['min'] + '分鐘';}
  
          else if (nowTime['hr'] == state.stories[i].postTime['hr'] && nowTime['min'] == state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['sec'] - state.stories[i].postTime['sec'] + '秒';}

          else if (nowTime['hr'] == state.stories[i].postTime['hr'] && nowTime['min'] == state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['sec'] - state.stories[i].postTime['sec'] + '秒';}
  
          else {
          state.duringTime[i] = nowTime['hr'] - state.stories[i].postTime['hr'] + 24 + '小時';}
      }

      console.log(state.stories);  
      console.log(state.duringTime)
    },


  },
  actions: {
    async accessCode({state, dispatch}) {
      // if code doesn't exist, then carry out Facebook login 
      if (!window.location.search.substring(6)) {
        window.location = 'token/dialog/oauth?client_id=326560215674441&redirect_uri=https://localhost:8080/&scope=instagram_basic, pages_show_list, pages_read_engagement, instagram_manage_comments, business_management, public_profile, instagram_content_publish, ads_management, instagram_manage_insights'
      }
      // When Facebook login is done, get code form url
      state.code = window.location.search.substring(6)
      console.log(state.code)

      await dispatch('accessToken')
      await dispatch('getUserPage')
      await dispatch('getIgAccountID')
      
      // Promise.all(dispatch('basicInfos')) 
      dispatch('basicInfos')
      dispatch('tagInfos')
      dispatch('stories')

      console.log(state.accessToken)
      console.log(state.userID)
      console.log(state.igAccountID)
    },

    accessToken({state}) {
      return axios.get('api/oauth/access_token',
      {params: {
        client_id: '326560215674441',
        redirect_uri: 'https://hiltonpo.github.io/hw_vue_ig/',
        client_secret: '66f2c6e3593d41fa78cd473dac4fb0f1',
        code: state.code,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        state.accessToken = response.data.access_token
      })
      .catch(error => {
        console.log(error);
      });
    },

    getUserPage({state}) {
      return axios.get('api/me/accounts',
      {params: {
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        state.userID = response.data.data[0]['id']
      })
      .catch(error => {
        console.log(error);
      });
    },

     getIgAccountID({state}) {
      return axios.get('api/' + state.userID,
      {params: {
        fields: 'instagram_business_account',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        state.igAccountID = response.data['instagram_business_account']['id']
      })
      .catch(error => {
        console.log(error);
      });
    },

    // basic information including username, follower, posts... 
    basicInfos({commit, state}) {
      // await dispatch('accessCode')
      axios.get('api/' + state.igAccountID,
      {params:{
        fields: 'business_discovery.username(hiltonpopo){username,website,name,ig_id,id,profile_picture_url,biography,follows_count,followers_count,media_count,media{caption,like_count,comments_count,media_url,permalink,media_type,timestamp}}',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
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

        state.itemInfo[0].value = posts;
        state.itemInfo[1].value = followers;
        state.itemInfo[2].value = follows;
        commit('photoInfos');
      })
      .catch(error => {
        console.log(error);
      });
    },

    //tag photo information 
    tagInfos({commit, state}) {
      axios.get('api/' + state.igAccountID + '/tags',
      {params:{
        fields: 'id,caption,username,media_url,like_count',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data);
        state.rowTagData = response.data.data;
        commit('tagPhotoInfos', state.rowTagData);
      })
      .catch(error => {
        console.log(error);
      });
    },
    // readUI for comments 
    readComment({commit, state}) {
      axios.get('api/' + state.eventInfo.postID + '/comments',
      {params:{
        fields: 'id,username,text,like_count,replies,timestamp',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        commit('getComments', response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });     
    },

    //createUI for comments 
    postComment({commit, state}) {
      axios.post('api/' + state.eventData.postID + '/comments',
      { message: state.commentInfo,
        access_token: state.accessToken,})
      .then(response => {
        commit('putComments', response.data)
        console.log(response.data);
        commit('closeTextarea')
        
      })
      .catch(error => {
        console.log(error.response.data);
        state.errorMessage = error.response.data;
      });
    },
    
    //deleteUI for comments 
    deleteComment({commit, state}, comment) {
      axios.delete('api/' + comment.id ,
      {data: {access_token: state.accessToken}})
      .then(response => {
        commit('removeComments');
        commit('closeEditMode');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    },

    //stories 
    stories({commit, state, dispatch}) {
      console.log(state.igAccountID)
      axios.get('api/' + state.igAccountID + '/stories',
      {params:{
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data.data)
        commit('GetStoriesId', response.data.data)
        dispatch('storiesInfo')
      })
      .catch(error => {
        console.log(error);
      });
    },

    storiesInfo({state, commit}) {
      let promises = [];
      let storyInfos = [];
      for (var i = 0; i<state.storyIDs.length; i++) {
        promises.push(
          axios.get('api/' + state.storyIDs[i],
          {params:{
            fields: 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username',
            access_token: state.accessToken,
          }},
          {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
          .then(response => {
            storyInfos.push(response.data)
          })
          .catch(error => {
            console.log(error);
          })
        )
      }
      Promise.all(promises)
      .then(() => {
        console.log(storyInfos)
        commit('putStoryData', storyInfos)
      });
    },
  },
  modules: {
  }
})
