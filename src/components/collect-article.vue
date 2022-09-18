<template>
  <!-- <van-icon
    :name="value ? 'star' : 'star-o'"
    :class="{ cellect: value }"
    color="#777"
    @click="onselectFn"
    :loading="loading"
  /> -->
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collect: value,
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { isSelectedAPI, delSelectAPI } from "@/api";
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        //  如果已经收藏就掉接口取消收藏
        if (this.value) {
          await delSelectAPI(this.id);
        } else {
          await isSelectedAPI(this.id);
        }
        this.$toast.success(this.value ? "取消收藏成功" : "已收藏");
        // 将收藏状态取反发送给父组件
        this.$emit("input", !this.value);
      } catch (err) {
        this.$toast.fail("操作失败，请稍后重试");
      }
      this.loading = false;
    },
  },
};
</script>
<style  scoped lang="less">
.collect {
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