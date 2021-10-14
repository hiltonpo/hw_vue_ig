module.exports = {
    devServer: {
      proxy:'http://localhost:8888/',
      // port:8080,
      // proxy: {
      //   '/api': {
      //     target: 'https://graph.facebook.com/v11.0/',
      //     changeOrigin: true,
      //     secure:false,
      //     logLevel: 'debug' 
      //   },
      // }



      
  
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/hw_vue_ig/'
    : '/'
  }