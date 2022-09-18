<template>
  <div class="search-container">
    <!-- 这里是顶部的搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="searchForm">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3396fb"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 下面的搜索建议，搜索结果，编辑分别分为三个组件 -->
    <!-- 三者互斥 -->
    <SearchResults v-if="isResultShow" :searchText="searchText"></SearchResults>
    <!-- 给搜索建议传过去关键字,点击搜索结果触发search事件 -->
    <SearchSuggestions
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestions>
    <!-- 将搜索历史的数组传过去 -->
    <History
      v-else
      :historyList="historyList"
      @search="onSearch"
      @clearSearchHistory="historyList = []"
    ></History>
  </div>
</template>
<script>
import SearchSuggestions from "./components/SearchSuggestions.vue";
import SearchResults from "./components/SeatchResults.vue";
import History from "./components/History";
import { setItem, getItem } from "@/utils/storage";
export default {
  data() {
    return {
      searchText: "", //绑定表单的内容
      isResultShow: false,
      historyList: getItem("historyList") || [], //发生搜索事件时给数组添加数据
    };
  },
  watch: {
    historyList(newVal) {
      // console.log("父组件侦听");
      setItem("historyList", newVal);
    },
  },
  methods: {
    // 回车或手机点击搜索时触发,val是表单输入的值
    onSearch(val) {
      // 给历史记录数组添加数据
      // 先判断数据会不会重复，重复就删掉旧的，
      const index = this.historyList.indexOf(val);
      if (index != -1) this.historyList.splice(index, 1);
      // 将新的添加到最前面
      this.historyList.unshift(val);
      // 最多留五项
      this.historyList = this.historyList.slice(0, 5);
      // 发生搜索显示搜索结果列表
      this.isResultShow = true;
      // 当点击了建议页面的内容，应该将建议内容的文本赋值给搜索框
      this.searchText = val;
      // console.log(val)
    },
    onCancel() {
      // 点击取消时触发
      this.$router.back();
    },
  },
  components: {
    SearchSuggestions,
    SearchResults,
    History,
  },
  mounted() {
    // input框出来自动获取光标
    const ipt = document.querySelector(".van-field__control");
    ipt.focus();
  },
};
</script>
<style  scoped lang="less">
.search-container {
  // padding-top: 54px;
  /deep/ .van-search__action {
    color: #fff;
  }
  .searchForm {
    position: sticky; //在可视范围内标准流，脱离可视范围就固定定位
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>