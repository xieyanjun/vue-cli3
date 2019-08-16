<template>
  <div>
    <div class="upload-style">
      <el-upload
        :show-file-list="false"
        :on-success="handleImgSuccess"
        :before-upload="beforeImgUpload"
        :action="uploadUrl"
        :data="uploadData"
        :multiple="isMultiple"
        :accept="paramsObjUsed.acceptImg"
        :limit="paramsObjUsed.limit"
        :on-exceed="onExceed"
        :on-error="handleError"
        name="files[]"
      >
        <el-button size="small" plain icon="el-icon-plus">点击上传</el-button>
      </el-upload>
      <ul class="img-box" v-if="fileList && fileList.length > 0">
        <li
          v-for="(item, index) in fileList"
          :key="index"
          v-loading="item.loading"
          :style="
            `width:${paramsObjUsed.imgWidth};height:${paramsObjUsed.imgHeight}`
          "
        >
          <img
            v-if="item.url"
            :src="item.url"
            :width="paramsObjUsed.imgWidth"
            alt
          />
          <span v-if="item && isShowClose && item.url" @click="deleteImg(item)"
            >✕</span
          >
        </li>
        <!-- <li v-if="isMultiple && fileList.length > 1" v-loading="loading"></li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "child",
  props: {
    paramsObj: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    imgSize: {
      //限制图片宽高，不带px单位
      type: Object,
      required: false,
      default: () => {
        return {
          width: "",
          height: ""
        };
      }
    },
    isMultiple: {
      //是否多张上传
      type: Boolean,
      required: false,
      default: () => {
        return false;
      }
    },
    isShowClose: {
      //是否支持删除图片
      type: Boolean,
      required: false,
      default: () => {
        return true;
      }
    },
    defaultImgArr: {
      // 默认图片数组
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      paramsObjUsed: {
        project: "hooli", // 上传图片接受的参数，默认是“hooli”
        contentType: "", //上传图片接受的参数，默认是“”
        acceptImg: "image/*", //上传图片配置接受的图片格式
        imgFormat: "", //图片格式
        imgFormatArr: [], //图片类型数组做匹配查询
        sizeTips: "", //图片大小
        imgWidth: "200px", //图片宽
        imgHeight: "", //图片高
        fileSize: 1048576, //默认是1M
        limit: 10, //每次上传多少张图片初始化，动态改变
        limitTips: 10, //每次最多上传多少张图片提示
        totalImg: 100 //最多上传多少张图片
      },
      uploadUrl: "",
      uploadData: {
        project: "hooli",
        contentType: this.paramsObj.contentType
      },
      fileList: [], //上传服务器地址url
      delFileList: [], //删除的图片
      loading: false,
      fileListRemove: []
    };
  },
  watch: {
    paramsObjUsed: {
      handler(val) {
        return val.limit;
      },
      deep: true
    }
  },
  computed: {
    newValue() {
      return this.paramsObjUsed.limit;
    }
  },
  created() {
    this.paramsObjUsed = Object.assign(this.paramsObjUsed, this.paramsObj);
    this.uploadUrl = this.$apis.api_common_files;
  },
  mounted() {
    this.setImg(this.defaultImgArr);
    let { uploadData } = this;
    Object.assign(uploadData, this.$net.commonParams());
    uploadData.signToken = this.$net.paramsSign(uploadData, this.uploadUrl);
    this.uploadData = uploadData;
  },
  methods: {
    //删除图片按钮
    deleteImg(item) {
      let index = this.fileList.map(val => val.url).indexOf(item.url);
      if (index !== -1) {
        this.fileList.forEach((val, i) => {
          if (index == i) {
            this.delFileList.push(val.url);
          }
        });
        this.fileList.splice(index, 1);
        if (this.isMultiple) {
          this.handleRemove(index);
        }
      }
    },
    setImg(arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(val => {
          this.fileList.push({
            url: val
          });
        });
      }
    },
    getImg() {
      let savImgArr = [];
      this.fileList.forEach(item => {
        let val = item.url.substring(item.url.indexOf(".com") + 4);
        savImgArr.push(val);
      });
      return savImgArr;
    },
    delImg() {
      if (
        !this.delFileList ||
        !Array.isArray(this.delFileList) ||
        this.delFileList.length <= 0
      ) {
        return false;
      }
      let delImgArr = [];
      this.delFileList.forEach(item => {
        let val = item.substring(item.indexOf(".com") + 4);
        delImgArr.push(val);
      });
      let params = {};
      params.url = this.$apis.api_common_files_del;
      params.data = {
        url: JSON.stringify(delImgArr),
        project: "hooli"
      };
      this.$net.req(params, this).then(() => {});
    },
    beforeImgUpload(file) {
      if (this.isMultiple) {
        if (this.fileList.length < this.paramsObjUsed.totalImg) {
          this.paramsObjUsed.limit += 1;
        }
        this.fileList.push({ uid: file.uid, loading: true, url: "" });
      } else {
        this.fileList = [{ uid: file.uid, loading: true, url: "" }];
      }
      let that = this;
      let imgFormatArr = this.paramsObjUsed.imgFormatArr;
      if (imgFormatArr.indexOf(file.type) === -1) {
        this.$message.error(
          "上传的图片仅限" + this.paramsObjUsed.imgFormat + "格式"
        );
        return Promise.reject();
      }
      let fileSize = file.size;
      if (fileSize > this.paramsObjUsed.fileSize) {
        this.$message.error(
          "上传的图片大小不能超过" + this.paramsObjUsed.sizeTips
        );
        return Promise.reject();
      }
      const isOk = new Promise(function(resolve, reject) {
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function() {
          if (that.imgSize.width) {
            let valid =
              img.width == that.imgSize.width &&
              img.height == that.imgSize.height;
            valid ? resolve() : reject();
          } else {
            resolve();
          }
        };
        img.onerror = function() {
          that.$message.error("图片文件受损，请重新选择上传");
          return;
        };
      }).then(
        () => {
          return file;
        },
        () => {
          if (that.imgSize) {
            that.$message.error(
              "上传的图片尺寸为" +
                that.imgSize.width +
                "*" +
                that.imgSize.height +
                "px"
            );
          }
          return Promise.reject();
        }
      );
      return isOk;
    },
    handleRemove(idx) {
      if (this.fileListRemove.length > this.fileList.length) {
        this.fileListRemove.pop();
      }
      if (this.paramsObjUsed.limit > this.paramsObjUsed.limitTips) {
        this.paramsObjUsed.limit -= 1;
      }
      this.fileList.forEach((val, index) => {
        if (idx == index) {
          this.fileListRemove.splice(idx, 1);
        }
      });
    },
    //每次最多上传的图片张数
    onExceed(files, fileList) {
      let limitArr = [];
      for (let i in files) {
        limitArr.push(files[i]);
      }
      limitArr = limitArr.filter(function(x) {
        return x.name;
      });
      limitArr.pop();
      if (limitArr.length > this.paramsObjUsed.limitTips) {
        this.$message({
          message: "每次最多上传" + this.paramsObjUsed.limitTips + "张图片哦",
          type: "warning"
        });
        return false;
      } else if (fileList.length > this.paramsObjUsed.totalImg) {
        fileList.pop();
        this.$message({
          message: "最多上传" + this.paramsObjUsed.totalImg + "张图片哦",
          type: "warning"
        });
        return false;
      }
    },
    //总共最多能上传多少张图片
    maxImgArr(img, file) {
      if (this.fileList.length > this.paramsObjUsed.totalImg) {
        this.fileList.pop();
        this.$message({
          message: "最多上传" + this.paramsObjUsed.totalImg + "张图片哦",
          type: "warning"
        });
        return false;
      } else {
        this.fileList.forEach(val => {
          if (val.uid == file.uid) {
            val.loading = false;
            val.url = img;
          }
        });
      }
    },
    handleImgSuccess(res, file, fileList) {
      this.fileListRemove = fileList;
      if (parseInt(res.code) !== 0) {
        this.fileList.forEach(val => {
          if (val.uid == file.uid) {
            val.loading = false;
          }
        });
        this.$message.error(res.msg);
        return false;
      }
      let img = res.data.host + res.data.url[0];
      this.maxImgArr(img, file);
      this.fileList.forEach(val => {
        if (val.uid == file.uid) {
          val.loading = false;
          val.url = img;
        }
      });
    },
    handleError(err, file, fileList) {
      console.log("err", err, file, fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.one-img {
  position: relative;
  max-width: 200px;
  img {
    display: block;
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }
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
.img-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    height: auto;
    position: relative;
    margin: 15px 8px 0;
    .loading-style {
      position: absolute;
      z-index: 9999;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    img {
      height: auto;
    }
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
}
</style>
