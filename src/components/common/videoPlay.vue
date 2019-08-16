<template>
  <div class="video-inner animated zoomIn" @click.stop="handleBubble">
    <video
      :id="videoId"
      class="video-js vjs-big-play-centered video-player"
      controls
      :poster="videoItem && videoItem.poster"
      preload="auto"
      autoplay
    />
    <span class="icon icon-guanbi" @click="handleCloseVideo" />
  </div>
</template>
<script>
export default {
  props: {
    videoItem: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    videoId: {
      type: String,
      required: true,
      default: () => {
        return "myVideo";
      }
    }
  },
  data() {
    return {
      myVideoPlayer: null
    };
  },
  created() {
    this.loadImgSrc();
  },
  methods: {
    loadImgSrc() {
      this.$nextTick(() => {
        this.handlePlayVideo();
      });
    },
    handleCloseVideo() {
      if (this.myVideoPlayer) {
        this.myVideoPlayer.pause();
        this.myVideoPlayer.dispose();
        this.myVideoPlayer = null;
      }
      this.videoItem = null;
      this.$emit("closeVideo");
    },
    handleBubble() {},
    handlePlayVideo() {
      if (!window.videojs) {
        this.$message("加载失败，请稍后重试");
        return false;
      }
      this.$nextTick(() => {
        if (!this.myVideoPlayer) {
          this.myVideoPlayer = window.videojs(this.videoId, {
            autoplay: true,
            controls: true
          });
        }
        let mimeType = "";
        if (this.videoItem.videoUrl.toLowerCase().indexOf(".m3u8") !== -1) {
          mimeType = "application/x-mpegURL";
        } else if (
          this.videoItem.videoUrl.toLowerCase().indexOf(".mp4") !== -1
        ) {
          mimeType = "video/mp4";
        }
        this.myVideoPlayer.src({
          src: this.videoItem.videoUrl,
          type: mimeType
        });
        this.myVideoPlayer.play();
      });
    }
  }
};
</script>
<style lang="less">
.video-inner {
  .vjs-paused .vjs-big-play-button,
  .vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
  }
  .video-js .vjs-big-play-button {
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115, 133, 159, 0.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    // margin-left: -1.75em;
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
  }
  /* 加载圆圈 */
  .vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
  }
  .video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
  }
  .video-js .vjs-big-play-button .vjs-icon-placeholder:before,
  .video-js .vjs-modal-dialog,
  .vjs-button > .vjs-icon-placeholder:before,
  .vjs-modal-dialog .vjs-modal-dialog-content {
    position: relative;
  }
}
</style>

<style lang="less" scoped>
.video-inner {
  position: relative;
  width: 711px;
  height: 401px;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.17);
  background-color: #000000;
  animation-duration: 0.3s;
  .video-player {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .icon-guanbi {
    position: absolute;
    top: -18px;
    right: -15px;
    color: #ffffff;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>
