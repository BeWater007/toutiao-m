<template>
  <div class="name-containner">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="chanName"
    />
    <!-- 输入昵称区域 -->
    <div class="wrap">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { changeInfoAPI } from "@/api";
export default {
  data() {
    return {
      message: this.user.name,
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async chanName() {
      // 没改就直接关闭
      if (this.user.name === this.message) return this.$emit("close");
      if (!this.message.length) return this.$toast("昵称不能为空");
      this.$toast.loading({
        message: "更改中...",
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });
      try {
        await changeInfoAPI({
          name: this.message,
        });
        this.user.name = this.message;
        this.$toast.success("更改成功");
        this.$emit("close");
      } catch (error) {
        this.$toast.fail("修改昵称失败");
      }
    },
  },
};
</script>
<style  scoped>
.wrap {
  padding: 10px;
}
</style>