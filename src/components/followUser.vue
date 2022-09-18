<template>
  <!-- 因为用来v-if，所以根节点还是一个 -->
  <!-- 关注状态 -->
  <van-button
    v-if="isFollowed"
    :loading="loading"
    class="follow-btn"
    round
    size="small"
    @click="followFn"
    >已关注</van-button
  >
  <!-- 未关注状态 -->
  <van-button
    v-else
    :loading="loading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="followFn"
    >关注</van-button
  >
</template>
<script>
import { followByIdAPI, delFollowByIdAPI } from "@/api";
export default {
  name: "followUser",
  model: {
    prop: "isFollowed", // 默认是 value
    event: "update-is_followed", // 默认是 input
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    isFollowed: {
      required: true,
      type: Boolean,
    },
    userId: {
      required: true,
      type: [String],
    },
  },
  methods: {
    async followFn() {
      this.loading = true;
      try {
        // 如果已经关注就掉接口取消关注
        if (this.isFollowed) {
          await delFollowByIdAPI(this.userId);
        } else {
          // 没有关注就掉关注接口
          await followByIdAPI(this.userId);
        }
      } catch (err) {
        console.log(err);
        let msg = "操作失败请重试";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己！";
        }
        this.$toast(msg);
      }
      this.$emit("update-is_followed", !this.isFollowed);
      this.loading = false;
      // ---------
      // try {
      //   if (this.article.is_followed) {
      //     // 已关注，取消关注
      //     await delFollowByIdAPI(this.article.aut_id);
      //     // this.article.is_followed = false
      //   } else {
      //     // 没有关注，添加关注
      //     await followByIdAPI(this.article.aut_id);
      //     // this.article.is_followed = true
      //   }
      //   // 更新视图状态
      //   this.article.is_followed = !this.article.is_followed;
      // } catch (err) {
      //   console.log(err);
      //   let message = "操作失败，请重试！";
      //   if (err.response && err.response.status === 400) {
      //     //如果是400错误，则是关注自己的结果
      //     message = "你不能关注你自己！";
      //   }
      //   this.$toast(message);
      // }
    },
  },
};
</script>
<style  scoped>
</style>