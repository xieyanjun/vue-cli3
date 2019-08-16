module.exports = {
    root: true,  //此项是用来告诉eslint找当前配置文件不能往父级查找
    env: {  // 此项指定环境的全局变量
      node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    //注意，在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。解析器会被传入 parserOptions，但是不一定会使用它们来决定功能特性的开关。
    parserOptions: { 
      parser: "babel-eslint" //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    },
    globals: {
      window: true,
      Vue: true,
      Vuex: true,
      VueRouter: true,
      ELEMENT: true,
      axios: true,
      CryptoJS: true,
      Qs: true,
      vuePhotoPreview: true,
      Cropper: true,
      tinymce: true
    }
  };
  