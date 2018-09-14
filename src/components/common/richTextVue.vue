
<template>
  <div>
    <editor id="‘tinymce‘" v-model="tinymceHtml" :init="init"></editor>
    <button @click="submit">click</button>
  </div>
  
</template>


<script>
// import "@/assets/langs/zh_CN.js";
// import tinymce from "tinymce/tinymce";
// import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "tinymce",
  components: { Editor },
  data() {
    const Id = Date.now();
    return {
      Id: Id,
      Editor: null,
      DefaultConfig: {},
      init: {
        language_url: "/public/langs/zh_CN.js",
        language: "zh_CN",
        // skin_url: "/static/tinymce/skins/lightgray",
        height: 500,
        plugins:
          "styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen ",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat paste preview",
          file_picker_types: 'image',
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function() {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function() {
              var id = "blobid" + new Date().getTime();
              var blobCache =
                window.tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        paste_word_valid_elements: "*[*]", // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: true, // 插入word文档需要该属性
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",
      },
      tinymceHtml: ""
    };
  },
  props: {
    value: {
      default: "",
      type: String
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: "modern",
          height: 300
        };
      }
    }
  },
  mounted() {},
  methods:{
      submit(){
          console.log(this.tinymceHtml)
      }
  }
  //   methods:{
  //       init() {
  //       const self = this;
  //       this.Editor = window.tinymce.init({
  //         // 默认配置
  //         ...this.DefaultConfig,

  //         // prop内传入的的config
  //         ...this.config,

  //         // 挂载的DOM对象
  //         selector: `#${this.Id}`,
  //         file_picker_types: 'image',
  //   /* and here's our custom image picker*/
  //   file_picker_callback: function (cb, value, meta) {
  //     var input = document.createElement('input');
  //     input.setAttribute('type', 'file');
  //     input.setAttribute('accept', 'image/*');

  //     /*
  //       Note: In modern browsers input[type="file"] is functional without
  //       even adding it to the DOM, but that might not be the case in some older
  //       or quirky browsers like IE, so you might want to add it to the DOM
  //       just in case, and visually hide it. And do not forget do remove it
  //       once you do not need it anymore.
  //     */

  //     input.onchange = function () {
  //       var file = this.files[0];

  //       var reader = new FileReader();
  //       reader.onload = function () {
  //         /*
  //           Note: Now we need to register the blob in TinyMCEs image blob
  //           registry. In the next release this part hopefully won't be
  //           necessary, as we are looking to handle it internally.
  //         */
  //         var id = 'blobid' + (new Date()).getTime();
  //         var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
  //         var base64 = reader.result.split(',')[1];
  //         var blobInfo = blobCache.create(id, file, base64);
  //         blobCache.add(blobInfo);

  //         /* call the callback and populate the Title field with the file name */
  //         cb(blobInfo.blobUri(), { title: file.name });
  //       };
  //       reader.readAsDataURL(file);
  //     };

  //     input.click();
  //   },
  //         setup: editor => {
  //           // 抛出 'on-ready' 事件钩子
  //           editor.on("init", () => {
  //             self.loading = false;
  //             self.$emit("on-ready");
  //             editor.setContent(self.value);
  //           });
  //           // 抛出 'input' 事件钩子，同步value数据
  //           editor.on("input change undo redo", () => {
  //             self.$emit("input", editor.getContent());
  //           });
  //         }
  //       });
  //     }
  //   }
};
</script>

<style>
</style>

