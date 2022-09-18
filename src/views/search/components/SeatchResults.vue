<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.title"
        :to="{
          name: 'article',
          params: {
            articleId: item.art_id,
          },
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsAPI } from "@/api";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false,
    };
  },
  props: {
    // 接收父组件触发搜索函数时传过来的搜索关键字
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        // 测试失败
        // if (Math.random() > 0.4) throw new Error();
        //  1.获取数据
        const { data } = await getSearchResultsAPI({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        // console.log(data);
        // 2.将获取的数据追加到数组后面
        this.list.push(...data.results);
        // 3.将loading设置为false
        this.loading = false;
        // 4.判断是否还有数据，有就请求下一页的数据，没有就将finished设置为true
        if (data.results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch {
        //  将loading设置为false，做提示
        this.loading = false;
        this.error = true;
      }
    },
  },
};
</script>
<style  scoped>
</style>