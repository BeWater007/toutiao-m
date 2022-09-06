<template>
  <div class="layout-container">
    <!-- 二级路由挂载点 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <!-- 搭配路由使用 -->
    <van-tabbar  route>
      <van-tabbar-item icon="home-o" replace to="/layout/home">
        <template #icon>
          <i class="cs cs-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>

      <van-tabbar-item icon="search" replace to="/layout/wenda">
        <template #icon>
          <i class="cs cs-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>

      <van-tabbar-item icon="friends-o" replace to="/layout/video">
        <template #icon>
          <i class="cs cs-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>

      <van-tabbar-item icon="setting-o" replace to="/layout/my">
        <template #icon>
          <i class="cs cs-wode"></i>
        </template>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  methods: {}
}
</script>
<style  scoped lang="less">
.layout-container {
  i.cs {
    font-size: 18px;
  }
  .text {
    font-size: 14px;
  }
}
</style>
