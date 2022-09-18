<template>
  <div>
    <!-- 搜索历史 -->
    <van-cell title="历史记录">
      <template #right-icon>
        <div class="text" v-if="isDeleteShow">
          <span @click="$emit('clearSearchHistory')">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
      </template>
    </van-cell>

    <van-cell
      :title="text"
      v-for="(text, index) in historyList"
      :key="index"
      @click="handlerFn(index)"
    >
      <template #right-icon>
        <van-icon name="close" v-show="isDeleteShow" />
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDeleteShow: false,
    };
  },
  props: {
    historyList: {
      type: Array,
      required: true,
    },
  },
  // todo
  // watch: {
  //   historyList: {
  //     // deep: true,
  //     handler() {
  //       console.log("子组件侦听");
  //     },
  //     immediate: true,
  //   },
  // },
  mounted() {
    console.log(111);
  },
  methods: {
    handlerFn(i) {
      // 在删除情况下点cell单元格
      if (this.isDeleteShow) {
        this.historyList.splice(i, 1);
      } else {
        // 在非删除情况下点击，应当触发搜索事件，并将内容传过去
        this.$emit("search", this.historyList[i]);
      }
    },
  },
};
</script>
<style  scoped>
</style>