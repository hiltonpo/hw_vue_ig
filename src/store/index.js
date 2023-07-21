import { createStore } from 'vuex'
import axios from 'axios';






export default createStore({
  strict:true,
  state: {
    //access-token & user and account id
    accessToken:null,
    userID:[],
    igAccountID:[],

    //album & tags
    itemInfo:[
      {title:'貼文', value:''},
      {title:'粉絲', value:''},
      {title:'追蹤中', value:''},
    ],
    totalData:[],
    tagData:[],
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
    isTextarea:true,
    errorMessage:null,  
    activeComment:[],
    comments:[],
    replies:[],
    commentInfo:[],

    //story
    storyIDs:[],
    stories:[],
    duringTime:[],
  },
  mutations: {

    // get accessToken
    getAccessToken(state, access_token) {
      state.accessToken = access_token;
    },

    getUserID(state, userID) {
      state.userID = userID;
    },

    getAccountID(state, accountID) {
      state.igAccountID = accountID;
    },
    
    // metaData, information, album and tags
    getMetaData(state, metaData) {
      state.totalData = metaData.media.data;
      
      state.intro.username = metaData.username;
      state.intro.avatar = metaData.profile_picture_url;
      state.intro.name = metaData.name;
      state.intro.biography = metaData.biography;

      state.itemInfo[0].value = metaData.media_count;
      state.itemInfo[1].value = metaData.followers_count;
      state.itemInfo[2].value = metaData.follows_count;
    },

    getTagData(state, tagData) {
      state.tagData = tagData;
    },

    photoInfos(state) {
      state.totalData.forEach(photo => {
        state.photos.push(photo.media_url);    
      });
    },

    tagPhotoInfos(state) {
      state.tagData.forEach(tagPhoto => {
        state.tagPhotos.push(tagPhoto.media_url);
      });
    },

    // open posted in album
    createModal(state, {currentItem, index}) {
      state.eventID = index;
      state.eventInfo.photo = currentItem;
      state.eventInfo.postID = state.totalData[state.eventID].id;
      state.eventInfo.caption = state.totalData[state.eventID].caption;
      state.eventInfo.like = state.totalData[state.eventID].like_count;

      state.eventData = Object.assign([], state.eventInfo);
      console.log(state.eventData);
    },

    // open posted in tag
    createTagModal(state, {currentItem, index}) {
      state.showModal = true; 
      state.eventID = index;
      state.eventInfo.photo = currentItem;
      state.eventInfo.postID = state.tagData[state.eventID].id;
      state.eventInfo.caption = state.tagData[state.eventID].caption;
      state.eventInfo.like = state.tagData[state.eventID].like_count;

      state.eventData = Object.assign([], state.eventInfo);
      console.log(state.eventData);
    },
    
    // read comments in post 
    getComments(state, comments) {
      
      // order by time in comments
      const orderByTime_comments = comments.sort((a, b) => {
        return a.timestamp < b.timestamp ? 1 : -1;
      })
      // put ordered comments in post
      state.comments[state.eventID] = Object.assign([], orderByTime_comments);
      console.log(state.comments);
      console.log(state.eventID);
    },
    // read replies in post
    getReplies(state, replies) {
      // order by time replies and push replies
      var temporary_replies = []
      for (let i = 0; i<replies.length; i++) {
        temporary_replies.push(replies[i].sort((a, b) => {
          return a.timestamp > b.timestamp ? 1 : -1;
        }))
      }
      state.replies[state.eventID] = temporary_replies;
      console.log(state.replies)
    },

    // show the created comments immediately in post
    putComments(state, id) {
        let newComment = {
          "id": id.id,
          "username":"vue_demo_ig", 
          "text":state.commentInfo, 
          "like_count": 0,
        };
        state.comments[state.eventID].splice(0, 0, newComment)
      console.log(state.comments);
    },
    // show error when comment is blank
    showErr(state, error) {
      state.errorMessage = error;
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
      state.activeComment = null;
      state.errorMessage = null;
      state.commentInfo = []
    },

    //story
    //get stories id
    GetStoriesId(state, storyID) {
      var storyIdCount = storyID.length;
      
      for (let i = 0; i<storyIdCount; i++) {
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

        // calculate during time
        if (nowTime['hr']>state.stories[i].postTime['hr']) {
          state.duringTime[i] = nowTime['hr'] - state.stories[i].postTime['hr'] + '小時';}
        
          else if (nowTime['hr'] == state.stories[i].postTime['hr'] && nowTime['min'] > state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['min'] - state.stories[i].postTime['min'] + '分鐘';}

          else if (nowTime['hr'] + 1 == state.stories[i].postTime['hr'] && nowTime['min'] < state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['min'] + 60 - state.stories[i].postTime['min'] + '分鐘';}
  
          else if (nowTime['hr'] == state.stories[i].postTime['hr'] && nowTime['min'] == state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['sec'] - state.stories[i].postTime['sec'] + '秒';}

          else if (nowTime['hr'] == state.stories[i].postTime['hr'] && nowTime['min'] == state.stories[i].postTime['min']) {
          state.duringTime[i] = nowTime['sec'] - state.stories[i].postTime['sec'] + '秒';}
  
          else {
          state.duringTime[i] = nowTime['hr'] - state.stories[i].postTime['hr'] + 24 + '小時';}
      }

      console.log(state.stories);  
      console.log(state.duringTime);
    },


  },
  actions: {
    async accessCode({dispatch}) {
      // if code doesn't exist, then carry out Facebook login 
      // https://hiltonpo.github.io/vue_ig/
      let loginUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${process.env.VUE_APP_FB_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_FB_REDIRECTURI}&state={state-param}&scope=${process.env.VUE_APP_FB_SCOPE}`;
      const code = window.location.search.split('&')[0].substr(6)
      if (!code) {
        window.location = loginUrl;
      }
      // When Facebook login is done, get code form url
      dispatch('accessToken', {loginUrl, code});
    },

    accessToken({state, dispatch, commit}, {loginUrl, code}) {
      // return axios.get('api/oauth/access_token',
      return axios.get('https://graph.facebook.com/v17.0/oauth/access_token',
      {params: {
        client_id: process.env.VUE_APP_FB_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_FB_REDIRECTURI,
        client_secret: process.env.VUE_APP_FB_CLIENT_SECRET,
        code: code,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(async response => {
        await commit('getAccessToken', response.data.access_token);
        await dispatch('getUserPage');
        await dispatch('getIgAccountID');
        dispatch('basicInfos');
        dispatch('tagInfos');
        dispatch('stories');

        console.log(state.accessToken);
        console.log(state.userID);
        console.log(state.igAccountID);
      })
      .catch(error => {
        // get the same code when refreshing page, log-in fb again
        if (error.response.data.error.code == 100) {
          window.location = loginUrl;
        }
      });
    },

    getUserPage({state, commit}) {
      // return axios.get('api/me/accounts',
      return axios.get('https://graph.facebook.com/v17.0/me/accounts',
      {params: {
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        const userID = response.data.data[0]['id']
        commit('getUserID', userID);
      })
      .catch(error => {
        console.log(error);
      });
    },

    getIgAccountID({state, commit}) {
      // return axios.get('api/' + state.userID,
      return axios.get('https://graph.facebook.com/v17.0/' + state.userID,
      {params: {
        fields: 'instagram_business_account',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        const igAccountID = response.data.instagram_business_account.id
        commit('getAccountID', igAccountID)
      })
      .catch(error => {
        console.log(error);
      });
    },

    // basic information including username, follower, posts... 
    basicInfos({commit, state}) {
      // axios.get('api/' + state.igAccountID,
      axios.get('https://graph.facebook.com/v17.0/' + state.igAccountID,
      {params:{
        fields: 'business_discovery.username(vue_demo_ig){username,website,name,ig_id,id,profile_picture_url,biography,follows_count,followers_count,media_count,media{caption,like_count,comments_count,media_url,permalink,media_type,timestamp}}',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data)
        commit('getMetaData', response.data.business_discovery)
        commit('photoInfos');
      })
      .catch(error => {
        console.log(error);
      });
    },

    //tag photo information 
    tagInfos({commit, state}) {
      // axios.get('api/' + state.igAccountID + '/tags',
      axios.get('https://graph.facebook.com/v11.0/' + state.igAccountID + '/tags',
      {params:{
        fields: 'id,caption,username,media_url,like_count',
        access_token: state.accessToken,
      }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      .then(response => {
        console.log(response.data);
        commit('getTagData', response.data.data);
        commit('tagPhotoInfos');
      })
      .catch(error => {
        console.log(error);
      });
    },
    // readUI for comments 
    readComment({commit, state}) {
      // return axios.get('api/' + state.eventInfo.postID + '/comments',
      return axios.get('https://graph.facebook.com/v11.0/' + state.eventInfo.postID + '/comments',
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
    // read reply after comment reading is done
    readReply({dispatch, commit, state}) {
      async function Comment() {
        let readComment = await dispatch('readComment')
        return readComment
      }

      Comment().then(async () => {
        var replies = await Promise.all(state.comments[state.eventID].map((comment) => {
          // return axios.get('api/' + comment.id + '/replies',
          return axios.get('https://graph.facebook.com/v11.0/' + comment.id + '/replies',
          {params:{
            fields: 'id,username,text,timestamp',
            access_token: state.accessToken,
          }}, {headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        }))
        console.log(replies)
        commit('getReplies', replies.map(reply => reply.data.data))
      })
    },

    //createUI for comments 
    postComment({commit, state}) {
      if (state.commentInfo.length != 0) {
      // axios.post('api/' + state.eventData.postID + '/comments',
      axios.post('https://graph.facebook.com/v11.0/' + state.eventData.postID + '/comments',
      { message: state.commentInfo,
        access_token: state.accessToken,})
      .then(response => {
        commit('putComments', response.data)
        commit('closeTextarea')
        console.log(response.data);
        
      })
      .catch(error => {
        console.log(error.response.data.error.message);
        commit('showErr', error.response.data.error.message.substr(7));
      });}
      else {
        commit('showErr', 'comment cannot be blank');
      }
    },
    
    //deleteUI for comments 
    deleteComment({commit, state}, comment) {
      // axios.delete('api/' + comment.id ,
      axios.delete('https://graph.facebook.com/v11.0/' + comment.id ,
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
      // axios.get('api/' + state.igAccountID + '/stories',
      axios.get('https://graph.facebook.com/v11.0/' + state.igAccountID + '/stories',
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
      for (let i = 0; i<state.storyIDs.length; i++) {
        promises.push(
          // axios.get('api/' + state.storyIDs[i],
          axios.get('https://graph.facebook.com/v11.0/' + state.storyIDs[i],
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
