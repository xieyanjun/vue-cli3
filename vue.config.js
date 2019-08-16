module.exports = {
  configureWebpack: config => {
    config.externals = {};
    // config.externals = {
    //   vue: "Vue",
    //   vuex: "Vuex",
    //   axios: "axios",
    //   CryptoJS: "CryptoJS",
    //   //   Qs: "Qs",
    //   "vue-router": "VueRouter",
    //   "element-ui": "ELEMENT"
    //   //   vuePhotoPreview: "vuePhotoPreview"
    // };
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     filename: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
    //     threshold: 10240,
    //     deleteOriginalAssets: false,
    //     minRatio: 0.8
    //   })
    // );
  }
  //   publicPath:
  //     process.env.VUE_APP_ENV === "prod"
  //       ? "https://static.hoolihome.com/admin/run/"
  //       : "/run/"
};
