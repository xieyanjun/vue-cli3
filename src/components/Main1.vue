<template>
  <div class="hello">
    <h3>Hello</h3>
    <div><richText></richText></div>
    <input value="" />
  </div>
</template>

<script>
import richText from "@/components/common/richTextVue.vue";
export default {
  components: {
    richText
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
