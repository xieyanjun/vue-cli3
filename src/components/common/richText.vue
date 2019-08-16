<template>
  <div>
    <textarea :id="Id"></textarea>
  </div>
</template>

<script>
import "@/assets/langs/zh_CN.js";
export default {
  data() {
    const Id = Date.now();
    return {
      Id: Id,
      Editor: null,
      DefaultConfig: {
        // GLOBAL
        height: 500,
        theme: "modern",
        menubar: false,
        toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
        plugins: `
        paste
        importcss
        image
        code
        table
        advlist
        fullscreen
        link
        media
        lists
        textcolor
        colorpicker
        hr
        preview
    `,

        // CONFIG

        forced_root_block: "p",
        force_p_newlines: true,
        importcss_append: true,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
        *                         { padding:0; margin:0; }
        html, body                { height:100%; }
        img                       { max-width:100%; display:block;height:auto; }
        a                         { text-decoration: none; }
        iframe                    { width: 100%; }
        p                         { line-height:1.6; margin: 0px; }
        table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
        .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
        ul,ol                     { list-style-position:inside; }
    `,

        insert_button_items: "image link | inserttable",

        // CONFIG: Paste
        paste_retain_style_properties: "all",
        paste_word_valid_elements: "*[*]", // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: true, // 插入word文档需要该属性
        paste_webkit_styles: "all",
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,

        // CONFIG: Font
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",

        // CONFIG: StyleSelect
        style_formats: [
          {
            title: "首行缩进",
            block: "p",
            styles: { "text-indent": "2em" }
          },
          {
            title: "行高",
            items: [
              { title: "1", styles: { "line-height": "1" }, inline: "span" },
              {
                title: "1.5",
                styles: { "line-height": "1.5" },
                inline: "span"
              },
              { title: "2", styles: { "line-height": "2" }, inline: "span" },
              {
                title: "2.5",
                styles: { "line-height": "2.5" },
                inline: "span"
              },
              { title: "3", styles: { "line-height": "3" }, inline: "span" }
            ]
          }
        ],

        // FontSelect
        font_formats: `
        微软雅黑=微软雅黑;
        宋体=宋体;
        黑体=黑体;
        仿宋=仿宋;
        楷体=楷体;
        隶书=隶书;
        幼圆=幼圆;
        Andale Mono=andale mono,times;
        Arial=arial, helvetica,
        sans-serif;
        Arial Black=arial black, avant garde;
        Book Antiqua=book antiqua,palatino;
        Comic Sans MS=comic sans ms,sans-serif;
        Courier New=courier new,courier;
        Georgia=georgia,palatino;
        Helvetica=helvetica;
        Impact=impact,chicago;
        Symbol=symbol;
        Tahoma=tahoma,arial,helvetica,sans-serif;
        Terminal=terminal,monaco;
        Times New Roman=times new roman,times;
        Trebuchet MS=trebuchet ms,geneva;
        Verdana=verdana,geneva;
        Webdings=webdings;
        Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ":prev,:next",
        object_resizing: true,

        // Image
        imagetools_toolbar:
          "rotateleft rotateright | flipv fliph | editimage imageoptions"
      }
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
  mounted() {
    this.init();
  },
  beforeDestroy() {
    // 销毁tinymce
    this.$emit("on-destroy");
    window.tinymce.remove(`#${this.Id}`);
  },
  methods: {
    init() {
      const self = this;
      this.Editor = window.tinymce.init({
        // 默认配置
        ...this.DefaultConfig,

        // prop内传入的的config
        ...this.config,

        // 挂载的DOM对象
        selector: `#${this.Id}`,
        file_picker_types: "image",
        /* and here's our custom image picker*/
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

          input.onchange = function() {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function() {
              /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
              var id = "blobid" + new Date().getTime();
              var blobCache =
                window.tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        setup: editor => {
          // 抛出 'on-ready' 事件钩子
          editor.on("init", () => {
            self.loading = false;
            self.$emit("on-ready");
            editor.setContent(self.value);
          });
          // 抛出 'input' 事件钩子，同步value数据
          editor.on("input change undo redo", () => {
            self.$emit("input", editor.getContent());
          });
        }
      });
    }
  }
};
</script>

<style></style>
