<template>
  <div class="hello">
    <!-- <div><richText></richText></div> -->
    <div><h3>Hello</h3></div>
    <div class="aa"><input value="" /></div>
  </div>
</template>

<script>
// import richText from "@/components/common/richTextVue.vue";
export default {
  components: {
    // richText
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  display: flex;
  .aa {
    flex: 1;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
