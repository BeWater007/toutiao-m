<template>
  <div class="update-photo">
    <img class="img" :src="url" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="confirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updatePhotoAPI } from "@/api";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  data() {
    return {
      cropper: {},
    };
  },
  props: {
    url: {
      type: [Object, String],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img;
    // cropper就是传给后端的头像信息
    this.cropper = new Cropper(image, {
      //crop剪裁，Cropper修剪机
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: true, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
    });
  },
  methods: {
    confirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // console.log(blob);
        this.$toast.loading({
          message: "更改中...",
          forbidClick: true,
          duration: 0, // 持续展示 toast
        });
        const formData = new FormData();
        formData.append("photo", blob);
        try {
          // 后台更新
          const { data } = await updatePhotoAPI(formData);
          //  console.log(data);
          // 前端更新
          this.$emit("updatePhoto", data.photo);
          this.$toast.success('更新成功')
          //  关闭弹出层
          this.$emit("close");
        } catch (err) {
          console.log(err);
          this.$toast.fail('更新失败')
        }
      });
    },
  },
};
</script>
<style  scoped lang="less">
.update-photo {
  height: 100%;
  background-color: #222;
}
.img {
  display: block;
  max-width: 100%;
}
.toolbar {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  .cancel,
  .confirm {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }
}
</style>