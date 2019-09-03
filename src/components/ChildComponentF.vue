<template>
  <div @click="childFuc">{{ dataText }}</div>
</template>
<script>
import eventVue from "@/assets/js/event.js";
export default {
  data() {
    return {
      dataText: "兄弟组件1"
    };
  },
  created() {},
  mounted() {},
  methods: {
    childFuc() {
      eventVue.$emit("childFuc", this.dataText);
    }
  }
};
</script>
