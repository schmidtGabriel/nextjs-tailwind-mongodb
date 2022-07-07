module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    MONGODB_URI: "mongodb://localhost/easymenu",
    APP_URL: "http://localhost:3000/",
    SECRET_KEY: "k31jpajdp32mmadDoNadaLSLKS98ADN",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};
//      SECRET_KEY: "k31jpajdp32mmadDoNadaLSLKS98ADN"
