<template>
  <div>
    <van-picker
      title="选择您的性别"
      show-toolbar
      :columns="columns"
      :default-index="user.gender"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { changeInfoAPI } from "@/api";
export default {
  data() {
    return {
      columns: ["女", "男"],
      gender: this.user.gender,
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      // 没改就直接关闭
      if (this.user.gender === this.gender) return this.$emit("close");
      this.$toast.loading({
        message: "更改中...",
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });
      try {
        await changeInfoAPI({
          gender: this.gender,
        });
        this.user.gender = this.gender;
        this.$toast.success("更改成功");
        this.$emit("close");
      } catch (error) {
        this.$toast.fail("修改性别失败");
      }
    },
    onChange(picker, value, index) {
      this.gender = index;
    },
  },
};
</script>
<style  scoped>
</style>