<template>
  <div class="hello">
    <!-- <div><h3>Hello</h3></div>
    <div class="aa"><input value="" /></div> -->
    <div class="bb">hahah</div>
    <div class="cc">lalla</div>
    <ul id="isUl">
      <li @click="clickHandle(index)" v-for="(item, index) in arr" :key="item">
        {{ item }}
      </li>
    </ul>
    <div class="child-style">
      <childCom></childCom>
      <childComT></childComT>
    </div>
    <div @click="countHandle">{{ count }}</div>
  </div>
</template>

<script>
import childCom from "@/components/ChildComponentF.vue";
import childComT from "@/components/ChildComponentT.vue";
export default {
  components: {
    childCom,
    childComT
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => {
    return {
      arr: [11, 22, 333]
    };
  },
  methods: {
    clickHandle(index) {
      // for (var i = 0; i < this.arr.length; i++) {
      //   console.log(i);
      // }
      console.log("li", index);
      // event.stopPropagation();
    },
    countHandle() {
      this.$store.dispatch("increment");
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  mounted() {
    this.$store.commit("increment");
    var ele = document.getElementById("isUl");
    ele.addEventListener(
      "click",
      event => {
        var src = event.target;
        console.log(event.type, event.timeStamp, event.eventPhase);
        if (src === "li") {
          this.clickHandle();
        }
      },
      true
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h3 {
  margin: 40px 0 0;
}
.hello {
  margin-top: 30px;
  // overflow: hidden;
  // zoom: 1;
}
.bb {
  margin-bottom: 30px;
}
.cc {
  line-height: 50px;
  margin-top: 50px;
}
</style>
