<template>
  <div>{{ dataText }}</div>
</template>
<script>
import eventVue from "@/assets/js/event.js";
export default {
  data() {
    return {
      dataText: "兄弟组件2"
    };
  },
  created() {},
  mounted() {
    this.bbtn();
  },
  methods: {
    bbtn() {
      eventVue.$on("childFuc", message => {
        //这里最好用箭头函数，不然this指向有问题
        this.dataText = message;
      });
    }
  }
};
</script>
