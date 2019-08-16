<template>
  <div>
    2
    <button @click="clickPush">点击跳转</button>
  </div>
</template>
<script>
export default {
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
