<template>
  <div class="my-container">
    <div class="head notLogin">
      <div class="login"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  methods: {}
}
</script>
<style  scoped lang="less">
.my-container {
  .notLogin {
    position: relative;
    height: 180px;
    background-image: url(~@/assets/banner.png);
    background-size: cover;
    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background-color: pink;
    }
  }
}
</style>
