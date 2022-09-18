<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentItem.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentItem.aut_name }}</div>
      <van-button
        :loading="comLoading"
        @click="onLikingCommentFn"
        class="likeBtn"
        :class="{
          liked: commentItem.is_liking,
        }"
        :icon="commentItem.is_liking ? 'good-job' : 'good-job-o'"
        >{{ commentItem.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentItem.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ commentItem.pubdate | timer }}</span>
        <van-button class="reply-btn" round  @click="$emit('reply_click',commentItem)">{{
          "回复" + commentItem.reply_count
        }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { commentLikingAPI, delCommentLikingAPI } from "@/api";
export default {
  name: "CommentItem",
  components: {},
  props: {
    commentItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comLoading: false,
    };
  },
  methods: {
    // 点击评论点赞按钮
    async onLikingCommentFn() {
      this.comLoading = true;
      try {
        // 已经点赞了就取消点赞
        if (this.commentItem.is_liking) {
          await delCommentLikingAPI(this.commentItem.com_id);
          this.commentItem.is_liking = false;
          this.commentItem.like_count--;
        } else {
          // 没有点赞就点赞
          await commentLikingAPI(this.commentItem.com_id);
          this.commentItem.is_liking = true;
          this.commentItem.like_count++;
        }
      } catch (err) {
        console.log(err);
      }
      this.comLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 10px;
    color: #222;
    margin-right: 12px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 68px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #222;
  }
  /deep/ .likeBtn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 10px;
    line-height: 15px;
    margin-right: 4px;
    .van-icon {
      font-size: 15px;
    }
    &.liked {
      color: #e5645f !important; //追加的点赞过后的样式
    }
  }
}
</style>