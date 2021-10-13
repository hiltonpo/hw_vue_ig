module.exports = {
    devServer: {
      proxy:'http://localhost:8888/'

      
  
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_ig/'
    : '/'
  }