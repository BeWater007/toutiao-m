<template>
  <!-- <van-icon
    :name="value ? 'star' : 'star-o'"
    :class="{ cellect: value }"
    color="#777"
    @click="onselectFn"
    :loading="loading"
  /> -->
  <van-button
    :icon="
      this.value === true
        ? 'good-job'
        : this.value === 1
        ? 'good-job'
        : 'good-job-o'
    "
    :class="{
      goodJob: this.value === true ? true : this.value === 1 ? true : false,
    }"
    :loading="loading"
    @click="onJob"
  />
</template>

<script>
import { goodJobAPI, badJobAPI } from "@/api";
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: [Boolean, Number],
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    async onJob() {
      this.loading = true;
      try {
        //  如果已经收藏就掉接口取消收藏
        if (this.value === true ? true : this.value === 1 ? true : false) {
          await badJobAPI(this.id);
        // 将收藏状态取反发送给父组件
          this.$emit("input", false);
        } else {
          await goodJobAPI(this.id);
        // 将收藏状态取反发送给父组件
          this.$emit("input", true);
        }
        this.$toast(
          this.value === true
            ? "取消点赞"
            : this.value === 1
            ? "取消点赞"
            : "已点赞"
        );
      } catch (err) {
        this.$toast.fail("操作失败，请稍后重试");
        console.log(err);
      }
      this.loading = false;
    },
  },
};
</script>
<style  scoped lang="less">
.goodJob {
  border: 0;
  color: #ffa500 !important;
}
/deep/ .van-button,
.van-button--normal {
  border: 0;
  .van-button__icon {
    font-size: 20px !important;
  }
}
</style>