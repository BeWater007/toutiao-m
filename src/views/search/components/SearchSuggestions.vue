<template>
  <div>
    <van-cell v-for="(text, index) in suggestList" :key="index" icon="search">
      <template #title>
        <div v-html="changColor(text)" @click="$emit('search', text)"></div>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestionsAPI } from "@/api";
import { debounce } from "lodash";
export default {
  data() {
    return {
      suggestList: [],
      timer: "",
    };
  },
  props: {
    // 接收父组件传过来的搜索关键字
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    // 侦听父组件传过来的关键字发生变化，变化就掉接口nashuju
    searchText: {
      // 添加防抖
      handler: debounce(function (newV) {
        // console.log(123);
        this.getSuggestions(newV);
      }, 300),
      // handler(newV) {
      //   //  console.log(132)
      //   this.getSuggestions(newV);
      // },
      // 因为 用户输入第一个字符才会生成整个模板，需要模板展示后立即执行
      immediate: true,
    },
  },
  methods: {
    async getSuggestions(q) {
      try {
        const { data } = await getSearchSuggestionsAPI(q);
        // 筛选出来为null的项
        this.suggestList = data.options;
      } catch (err) {
        this.$toast("获取搜索建议失败，请稍后再试");
      }
    },
    changColor(text) {
      const reg = new RegExp(this.searchText, "gi");
      return text?.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
  },
};
</script>
<style  scoped>
</style>