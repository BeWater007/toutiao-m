<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      :autofocus="true"
    />
    <van-button
      class="post-btn"
      @click="postCommentFn"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postCommentAPI } from "@/api";
export default {
  name: "CommentPost",
  components: {},
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async postCommentFn() {
      try {
        const { data } = await postCommentAPI({
          target: this.id, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId.toString() : null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        // console.log(data);
        this.list.unshift(data.new_obj);
        //让父组件的弹出文本域关闭
        this.$emit("postComment");
        // 清除文本内容
        this.message = "";
        this.$toast.success("发布成功");
      } catch (err) {
        this.$toast.fail("发布失败");
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 75px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    background: #fff;
    &::before {
      display: none;
    }
  }
}
</style>
