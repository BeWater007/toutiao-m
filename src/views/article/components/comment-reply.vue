<template>
  <div>
    <!-- navBar -->
    <van-nav-bar
      :title="
        commentItem.reply_count == 0
          ? '暂无回复'
          : commentItem.reply_count + '回复'
      "
      left-arrow
      @click-left="$emit('reply_colse')"
    />
    <!-- //给这几个布局添加可以滚动的容器 -->
    <div class="scroll-wrap">
      <!-- 接收到的当前评论项 -->
      <CommentItem :commentItem="commentItem"></CommentItem>
      <van-cell title="全部评论"></van-cell>
      <!-- 下面复用评论列表的组件 -->
      <CommentList
        :list="list"
        :art_id="commentItem.com_id"
        type="c"
      ></CommentList>
    </div>
    <!-- 发布评论的按钮 -->
    <div class="btn_wrap">
      <van-button type="default" class="btn" round @click="isReplyShow = true"
        >写写评论</van-button
      >
    </div>
    <!-- 发布评论回复弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <!-- 弹出层内部的组件 -->
      <CommentPost
        :id="commentItem.com_id"
        :list="list"
        :articleId="articleId"
        @postComment="postFn"
      ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "comment-reply",
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    commentItem: {
      type: Object,
      required: true,
    },
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      list: [],
      isReplyShow: false,
    };
  },

  methods: {
    postFn() {
      this.isReplyShow = false;
      this.commentItem.reply_count++;
    },
  },
};
</script>
<style  scoped lang="less">
.btn_wrap {
  border-top: 1px solid #ccc;
  height: 44px;
  line-height: 35px;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  .btn {
    width: 270px;
    height: 30px;
    background-color: pink;
    color: #fff;
  }
}
// .scroll-wrap {
//   position: fixed;
//   top: 46px;
//   height: 51px;
//   left: 0;
//   right: 0;
//   overflow-y: auto;
//   z-index: 10000;
// }
</style>