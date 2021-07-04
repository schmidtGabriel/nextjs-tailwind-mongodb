module.exports = {
    typescript: {
      ignoreBuildErrors: true,
    },
    env:{
      MONGODB_URI: "mongodb://localhost/easymenu",
      SECRET_KEY: "k31jpajdp32mmadDoNadaLSLKS98ADN"
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/admin',
          permanent: false,
        }
      ]
    },
  }
  //      SECRET_KEY: "k31jpajdp32mmadDoNadaLSLKS98ADN"
