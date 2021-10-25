module.exports = {
    devServer: {
      // proxy:'https://www.facebook.com/v11.0/',
      https: true,
      proxy: {
        '/api': {
          target: 'https://graph.facebook.com/v11.0',
          changeOrigin: true,
          ws: true,
          secure:false,
          logLevel: 'debug',
          pathRewrite:{'^/api':''},
        },
        '/token': {
          target: 'https://www.facebook.com/v11.0',
          changeOrigin: true,
          ws: true,
          secure:false,
          logLevel: 'debug',
          pathRewrite:{'^/token':''},
        },
        '/localhost':{
          target:'http://localhost:8888',
          changeOrigin: true,
          ws: true,
          secure:false,
          pathRewrite:{'^/localhost':''},
        }
      }



      
  
    },

    publicPath: process.env.NODE_ENV === 'production'
    ? '/hw_vue_ig/'
    : '/'
    
  }