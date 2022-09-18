<template>
  <div>
    <van-datetime-picker
      @cancel="$emit('close')"
      @confirm="onConfirm"
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import { changeInfoAPI } from "@/api";
import dayjs from "dayjs";
export default {
  data() {
    return {
      minDate: new Date(1920, 0, 0),
      maxDate: new Date(),
      currentDate: new Date(this.user.birthday),
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
      if (this.user.birthday === dayjs(this.currentDate).format("YYYY-MM-DD"))
        return this.$emit("close");
      this.$toast.loading({
        message: "更改中...",
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });
      try {
        await changeInfoAPI({
          birthday: dayjs(this.currentDate).format("YYYY-MM-DD"),
        });
        this.user.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");
        this.$toast.success("更改成功");
        this.$emit("close");
      } catch (error) {
        this.$toast.fail("修改生日失败");
        console.log(error);
      }
    },
  },
};
</script>
<style  scoped>
</style>