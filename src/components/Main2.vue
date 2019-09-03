<template>
  <div class="box">
    2
    <button @click="clickPush">点击跳转</button>
  </div>
</template>
<script>
export default {
  mounted() {},
  methods: {
    clickPush() {
      this.$router.push({
        //   path:'/about',
        name: "about",
        params: { id: "123" }
        //   query: { plan: 'private' },
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
