module.exports = {
    typescript: {
      ignoreBuildErrors: true,
    },
    env:{
      MONGODB_URI: "mongodb://localhost/virtualstore",
      SECRET_KEY: "k31jpajdp32mmadDoNadaLSLKS98ADN"
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/admin/login',
          permanent: true,
        },
        // {
        //   source: '/admin',
        //   destination: '/admin/dashboard',
        //   permanent: true,
        // },
      ]
    },
  }
  