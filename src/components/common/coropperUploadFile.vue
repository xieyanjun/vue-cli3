<template>
  <div class="container">
    <div>
      <el-button size="small" plain icon="el-icon-plus" @click="uploadFuc"
        >点击上传</el-button
      >
    </div>
    <!-- <loading v-if="loadingFlag"></loading> -->
    <div class="defaultimg" v-if="!imgurl && isShowdefault">默认图</div>
    <div class="coropperImg" v-if="listImg" :style="styleObjectImg">
      <img :src="listImg" :width="cutImgWidth" />
      <span @click="deleteImg" v-if="isShowDelete">✕</span>
    </div>
    <div class="upload-file">
      <el-dialog
        :visible.sync="dialogTableVisible"
        :title="title"
        :modal-append-to-body="false"
        :width="dialogWidth"
      >
        <div class="img-box">
          <div class="upload-box" :style="styleObject">
            <div class="upload">
              <div v-if="!imgurl" class="upFileStyle">
                <el-button
                  size="small"
                  @click="addFile"
                  plain
                  icon="el-icon-plus"
                  >点击上传</el-button
                >
                <div slot="tip" class="el-upload__tip">{{ tips }}</div>
                <input
                  type="file"
                  style="display:none"
                  ref="file"
                  accept="image/*"
                  @change="getFile($event)"
                />
              </div>
              <img
                v-if="imgurl"
                :id="imageId"
                :src="imgurl"
                class="avatarImg"
              />
            </div>
            <div
              v-if="imgurl"
              :class="['caropper', isDisable == true ? 'disabled' : '']"
            >
              <div
                @click="addFile"
                :class="['repeat-img', isDisable == true ? 'disabled' : '']"
              >
                重新上传
              </div>
              <input
                type="file"
                style="display:none"
                ref="file"
                accept="image/*"
                @change="getFile($event)"
              />
              <div class="icon-font">
                <div class="icon icon-jianqu" @click="narrowImg" />
                <div class="icon icon-zengjia" @click="enlargeImg" />
                <div class="icon icon-shuaxin" @click="refresh" />
              </div>
            </div>
          </div>

          <div class="imgPrew" :style="stylePrew">
            <div v-if="imgurl" class="prewImg" />
            <img v-else src alt />
            <h5>预览</h5>
            <div />
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" plain @click="dialogVisibleCancel"
            >取 消</el-button
          >
          <el-button
            size="small"
            plain
            :class="['sure', imgurl ? '' : 'disabled']"
            @click="confirm"
            :loading="loadingFlag"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    imageId: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    listImgParent: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    dialogWidth: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    contentType: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    tips: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    proportion: {
      type: Number,
      required: false,
      default: () => {
        return "";
      }
    },
    imgWidth: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    imgHeight: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    cutImgWidth: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    prewWidth: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    prewHeight: {
      type: String,
      required: false,
      default: () => {
        return "";
      }
    },
    sizeTips: {
      type: String,
      required: false,
      default: () => {
        return "图片大小不超1M";
      }
    },
    fileSize: {
      type: Number,
      required: false,
      default: () => {
        return 1048576;
      }
    },
    isShowdefault: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      }
    },
    isShowDelete: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      imgurl: "",
      uploadUrl: null,
      listImg: "",
      carImage: "",
      styleObject: {
        width: this.imgWidth,
        height: this.imgHeight
      },
      styleObjectImg: {
        maxWidth: this.cutImgWidth
      },
      stylePrew: {
        width: this.prewWidth,
        height: this.prewHeight
      },
      fileName: "",
      loadingFlag: false,
      isDisable: false
    };
  },
  created() {
    this.loadImgSrc();
  },
  mounted() {
    if (this.listImgParent) {
      this.listImg = this.listImgParent;
      this.$emit("listentoChild", this.listImgParent);
    }
  },
  methods: {
    //删除图片按钮
    deleteImg() {
      this.listImg = "";
      this.$emit("listentoChild", this.listImg);
    },
    loadImgSrc() {
      if (!document.getElementById("IMAGE_LINK_ID")) {
        let linkImage = document.createElement("link");
        linkImage.id = "IMAGE_LINK_ID";
        linkImage.type = "text/css";
        linkImage.rel = "stylesheet";
        linkImage.href =
          "//cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css";
        linkImage.onload = () => {
          let scriptImage = document.createElement("script");
          scriptImage.id = "IMAGE_SCRIPT_ID";
          scriptImage.type = "text/javascript";
          scriptImage.src =
            "//cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.js";
          document.body.appendChild(scriptImage);
        };
        document.head.appendChild(linkImage);
      }
    },
    addFile() {
      this.$refs.file.click();
    },
    getFile(event) {
      if (this.carImage) {
        this.carImage.destroy();
      }
      this.file = event.target.files[0];
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      };
      this.html5Reader(this.file, item);
      this.f = item;
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      let fileName = item.name
        .toLowerCase()
        .split(".")
        .splice(-1);
      this.fileName = fileName.join("");
      const isJPG = file.type == "image/jpeg";
      const isPNG = file.type == "image/png";
      const isLt5M = file.size > this.fileSize;
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG 格式 或 png 格式!");
        if (this.imgurl) {
          this.cuttingImg();
        }
        return false;
      }
      if (isLt5M) {
        this.$message.error(this.sizeTips);
        if (this.imgurl) {
          this.cuttingImg();
        }
        return false;
      }
      let _this = this;
      const reader = new FileReader();
      reader.onload = e => {
        _this.imgurl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.$nextTick(() => {
        setTimeout(() => {
          this.cuttingImg();
        }, 1000);
      });
    },
    confirm() {
      this.loadingFlag = true;
      this.isDisable = true;
      let cas = null;
      setTimeout(() => {
        cas = this.carImage.getCroppedCanvas().toDataURL("image/jpeg");
        let formData = new FormData();
        let uploadData = {
          contentType: this.contentType,
          project: "hooli"
        };
        Object.assign(uploadData, this.$net.commonParams());
        uploadData.signToken = this.$net.paramsSign(
          uploadData,
          this.$apis.api_common_files
        );
        for (let key in uploadData) {
          formData.append(key, uploadData[key]);
        }
        let file = this.dataURLtoFile(cas, `imageName.${this.fileName}`);
        formData.append("files[]", file);
        axios
          .post(this.$apis.api_common_files, formData, {
            "Content-Type": "multipart/form-data"
          })
          .then(
            res => {
              this.loadingFlag = false;
              this.isDisable = false;
              let data = res.data;
              if (parseInt(data.code) == 0) {
                let imgUrl = data.data.host + data.data.url;
                this.listImg = imgUrl;
                this.dialogTableVisible = false;
                this.$emit("listentoChild", imgUrl);
              }
            },
            e => {
              this.loadingFlag = false;
              e && e.msg
                ? this.$message.error(e && e.msg)
                : this.$message.error("上传超时，请压缩图片后重试。");
            }
          );
      }, 100);
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    dialogVisibleCancel() {
      this.loadingFlag = false;
      this.dialogTableVisible = false;
    },
    uploadFuc() {
      this.dialogTableVisible = true;
      this.imgurl = "";
      if (this.carImage) {
        this.carImage.destroy();
      }
    },
    cuttingImg() {
      let image = document.getElementById(this.imageId);
      this.carImage = new Cropper(image, {
        aspectRatio: this.proportion,
        viewMode: 1,
        crop() {},
        preview: ".prewImg"
      });
    },
    refresh() {
      this.carImage.reset();
    },
    narrowImg() {
      this.carImage.zoom(-0.1);
    },
    enlargeImg() {
      this.carImage.zoom(0.1);
    }
  }
};
</script>
<style>
.container .el-dialog__header {
  padding: 10px 0 10px 10px !important;
}
.container .avatar-uploader .el-upload {
  border: 0;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.container .el-button.is-plain:focus,
.container .el-button.is-plain:hover {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid;
  color: rgba(102, 102, 102, 1);
}
.container .el-upload__tip {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding: 0 40px;
  line-height: 23px;
}
.container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.container .avatarImg {
  width: 270px;
  height: 270px;
}
.container .dialog-footer button {
  width: 120px;
  height: 36px;
  line-height: 36px;
  background: rgba(249, 249, 249, 1);
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 0;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  outline: none;
}
.container .dialog-footer .sure {
  background: rgba(255, 82, 61, 1);
  border-radius: 4px;
  border: 0;
  color: #fff;
  margin-left: 10px;
}
.container .el-dialog {
  width: 470px;
}
.container .el-dialog__footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding: 30px 0;
  margin-top: 30px;
  text-align: center;
}
.container .el-dialog__body {
  padding: 40px 20px;
}
</style>

<style lang="less" scoped>
.container {
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  .defaultimg {
    font-size: 12px;
    line-height: 12px;
    margin: 24px 0 10px;
  }
  .coropperImg {
    margin-top: 10px;
    position: relative;
    span {
      width: 20px;
      height: 20px;
      display: inline-block;
      position: absolute;
      top: -27px;
      right: -22px;
      z-index: 10;
      cursor: pointer;
    }
  }
  #imageId {
    width: 110px;
    height: 100px;
  }
  .img-box {
    display: flex;
    justify-content: space-between;
    .upload-box {
      position: relative;
      .upload {
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: rgba(249, 249, 249, 1);
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .upFileStyle {
          position: relative;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // flex-wrap: wrap;
        }
      }
    }
    .caropper {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      .icon-font {
        display: flex;
        cursor: pointer;
        .icon {
          color: #999999;
          margin-left: 20px;
          font-size: 14px;
        }
      }
    }

    .repeat-img {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 179, 85, 1);
      cursor: pointer;
    }
    .imgPrew {
      background: rgba(238, 238, 238, 1);
      text-align: center;
      margin-top: 40px;
      .prewImg {
        width: 100% !important;
        height: 100% !important;
        box-shadow: 15px 0px 55px 17px rgba(0, 0, 0, 0.05);
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
      }
      h5 {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
      }
    }
  }
}
</style>
