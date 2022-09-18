<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <CommentItem
        v-for="(item, index) in list"
        :key="index"
        :commentItem="item"
        @reply_click="$emit('reply_click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { loadCommentsAPI } from "@/api";
import CommentItem from "./comment-item.vue";
export default {
  name: "comment-list",
  props: {
    art_id: {
      type: [Number, String],
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ["a", "c"].includes(value);
      },
    },
  },
  components: {
    CommentItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
    };
  },
  created() {
    this.onLoad(); //vantlist组件需要列表在可视区域才会触发，直接初始化调用
    this.loading = true; //初始化直接显示loading效果
    this.$emit("abc");
  },
  methods: {
    async onLoad() {
      try {
        // 1.获取数据
        const { data } = await loadCommentsAPI({
          type: this.type, //评论文章为a，回复文章为c
          source: this.art_id, //源id，文章id或评论id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10, //每页的数据
        });
        // console.log(data);
        // 2.将数据追加到list中
        //将评论总条数传到组件用于展示
        this.$emit("sendTotal_count", data.total_count);
        this.list.push(...data.results);
        // 3.关闭loading
        this.loading = false;
        //TODO改变模板数据

        // 4.看是否还有数据，有就获取下一次的数据，没有就finished
        if (data.results < 10) {
          this.finished = true;
        } else {
          this.offset = data.last_id;
        }
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style  scoped>
</style>