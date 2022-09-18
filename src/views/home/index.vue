<template>
  <div class="home-container">
    <!-- 头部navbar -->
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-button color="#5aacf9" class="nav-btn" round icon="search" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs v-model="active" class="tabs" animated swipeable>
      <van-tab :title="obj.name" v-for="obj in pdList" :key="obj.id">
        <!-- 文章列表区域 -->
        <ArtList :obj="obj"></ArtList>
      </van-tab>
      <!-- 汉堡按钮 -->
      <template #nav-right>
        <div class="humburger">
          <i class="cs cs-gengduo" @click="bjShow = true"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 列表编辑区域 -->
    <!-- 编辑弹出层 -->
    <van-popup
      v-model="bjShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <!-- 编辑主体区域 -->
      <!-- 把获取到的顶部导航的数据传给编辑主体组件 -->
      <BJ
        :pdList="pdList"
        :active="active"
        :tjList="tjList"
        @changeActive="changFn"
      ></BJ>
    </van-popup>
  </div>
</template>

<script>
import { getMypindaoAPI, getAllListAPI } from '../../api'
import ArtList from './components/ArtList.vue'
import BJ from './components/BJ.vue'
import { getItem } from '../../utils/storage'
export default {
  data () {
    return {
      active: 0,
      pdList: [],
      bjShow: false,
      allList: []
    }
  },
  created () {
    this.getPdList()
    this.getAllList()
  },
  components: {
    ArtList,
    BJ
  },
  methods: {
    // 获取频道列表的方法
    async getPdList () {
      // try {
      //   const res = await getMypindaoAPI();
      //   this.pdList = res.data.channels;
      // } catch (err) {
      //   this.$toast("获取频道列表失败");
      // }
      // 根据用户是否登录的情况来提供数据
      // 1.用户登录就掉接口给推荐列表
      // 2.用户没有登录就从本地拿数据提供
      // 2.1用户第一次登录本地没有数据就调接口给推荐列表
      // 2.2用户有本地的就给本地
      const localChannel = getItem('pdList')
      if (this.$store.state.user.token || !localChannel) {
        try {
          const res = await getMypindaoAPI()
          this.pdList = res.data.channels
        } catch (err) {
          this.$toast('获取频道列表失败')
        }
      } else {
        this.pdList = localChannel
      }
    },
    async getAllList () {
      try {
        const { data } = await getAllListAPI()
        // 拿到全部的数据
        this.allList = data.channels
      } catch (err) {}
    },
    // 子传父，改变active
    changFn (index, bjShow) {
      this.active = index
      //  然后根据第二个参数开关弹层
      this.bjShow = bjShow
    }
  },
  computed: {
    tjList () {
      return this.allList.filter((item) => {
        // 筛选找不到的
        return this.pdList.findIndex((pdItem) => pdItem.id === item.id) === -1
        // console.log(index);
        // return index == -1;
      })
    }
  }
}
</script>
<style  scoped lang="less">
.home-container {
  padding-top: 90px;
  /deep/ .van-tabs__wrap {
    padding-right: 27px;
    position: fixed;
    z-index: 1;
    top: 46px;
    left: 0;
    right: 0;
  }
  /deep/ .van-tabs__nav {
    padding-left: 0;
  }
  .van-tabs {
    padding-right: 0 !important;
  }
  /deep/ .van-nav-bar__title {
    max-width: 100%;
  }
  .nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #3297fa;
    .nav-btn {
      width: 278px;
      height: 33px;
      font-size: 16px;
      color: #fff;
      .van-icon {
        font-size: 20px;
        color: #fff;
      }
    }
  }
  /deep/ .tabs {
    .van-tabs--line {
      height: 41px;
    }
    .van-tab__pane {
      font-size: 30px;
    }
    .van-tab {
      border-right: 1px solid #edf0f0;
      width: 100px;
      //  padding: 0;
      .van-tab__text {
        font-size: 14px;
        color: #777;
      }
    }
    .van-tab--active {
      .van-tab__text {
        color: #333;
      }
    }
    .van-tabs__line {
      bottom: 19px;
      width: 16px;
      height: 4px;
      background-color: #3496fa;
    }
    .humburger {
      width: 34px;
      height: 44px;
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.9;
      background-color: #fff;
      i.cs-gengduo {
        font-size: 18px;
      }
      &::before {
        position: absolute;
        left: 0;
        content: "";
        height: 44px;
        width: 1px;
        background-image: url(../../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
  /deep/ .van-icon-cross:before {
    color: #222;
  }
}
</style>
