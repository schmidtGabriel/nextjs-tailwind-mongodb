module.exports = {
    typescript: {
      ignoreBuildErrors: true,
    },
    env:{
      MONGODB_URI: "mongodb://localhost/virtualstore",
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true,
        },
      ]
    },
  }
  