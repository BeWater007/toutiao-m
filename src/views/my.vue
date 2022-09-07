<template>
  <div class="my-container">
    <!-- 已登录的盒子 -->
    <div class="header userinfo" v-if="user">
      <!-- 左侧用户头像部分 -->
      <div class="info">
        <div class="avatar">
          <van-image
            class="Img"
            width="66"
            height="66"
            round
            fit="cover"
            :src="info.photo"
          />
          <span>{{info.name}}</span>
        </div>
        <div class="edit">
          <van-button type="primary" round class="btn">编辑资料</van-button>
        </div>
      </div>
      <div class="data">
        <div class="item">
          <div class="count">{{info.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="item">
          <div class="count">{{info.fans_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="item">
          <div class="count">{{info.follow_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="item">
          <div class="count">{{info.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 未登录的盒子 -->
    <div class="header notLogin" v-else>
      <div class="login-btn" @click="$router.push({ name: 'login' })">
        <img src="@/assets/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </div>
    <!-- 收藏、历史宫格导航 -->
    <div class="grid-nav">
      <van-grid :column-num="2" clickable class="grid-nav">
        <!-- 第一格 -->
        <van-grid-item>
          <!-- 插槽-图标 -->
          <template #icon>
            <i class="cs cs-shoucang"></i>
          </template>
          <!-- 插槽-文字 -->
          <template #text>
            <span>收藏</span>
          </template>
        </van-grid-item>
        <!-- 第二格 -->
        <van-grid-item>
          <!-- 插槽-图标 -->
          <template #icon>
            <i class="cs cs-lishi"></i>
          </template>
          <!-- 插槽-文字 -->
          <template #text>
            <span>历史</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- // 消息通知cell单元格 -->
    <div class="cell-box">
      <van-cell center title="消息通知" is-link class="cell"> </van-cell>
      <van-cell center title="小智同学" is-link class="cell"> </van-cell>
    </div>
    <div class="tuichu" v-if="user">
      <van-cell center title="退出登录" class="cell" @click="tuichuFn">
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getMyIofoAPI } from '../api'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13915836551%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665107527&t=b6842da8e4b74480747b8beb75a45a7c',
      info: ''
    }
  },
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUsers']),
    // 点击退出按钮
    tuichuFn () {
      // console.log('123')
      this.$dialog.confirm({
        message: '您确定要退出吗'
      })
        .then(() => {
          // on confirm
          this.setUsers(null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 用户登录后获取数据
    async getUserInfo () {
      const res = await getMyIofoAPI()
      this.info = res.data
    // console.log(this.info)
    }
  }
}
</script>
<style  lang="less">
body {
  background-color: #f5f8f8;
}
.my-container {
  // 共用背景图
  .header {
    height: 180px;
    background-image: url(~@/assets/banner.png);
    background-size: cover;
  }
  // 未登录个人信息
  .notLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100px;
      height: 80px;
      span {
        font-size: 16px;
        color: #fff;
      }
      img {
        width: 66px;
        height: 66px;
        margin-bottom: 8px;
      }
    }
  }
  // 已登录个人信息
  .userinfo {
    overflow: hidden;
    .info {
      height: 66px;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .avatar {
        display: flex;
        align-items: center;
        padding-left: 15px;
        .Img {
          margin-right: 11px;
          border: 2px solid #fff;
        }
        span {
          font-size: 14px;
          color: #fff;
        }
      }
      .edit {
        display: flex;
        align-items: center;
        padding-right: 16px;
        .btn {
          width: 78px;
          height: 20px;
          background-color: #fff;
          color: #666;
          font-size: 12px;
          border: 0;
        }
      }
    }
    .data {
      height: 74px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: #fff;
        font-size: 14px;
        .text {
          margin-top: 6px;
        }
      }
    }
  }
  // 历史收藏宫格导航
  .grid-nav {
    height: 71px;
    i.cs {
      font-size: 23px;
    }
    .cs-shoucang {
      color: #db5a5a;
    }
    .cs-lishi {
      color: #fd9f1e;
    }
    span {
      display: inline-block;
      margin-top: 4px;
      font-size: 14px;
    }
  }
  // 消息通知cell单元格 -->
  .cell-box {
    margin-top: 10px;
    .cell {
      height: 50px;
      font-size: 14px;
      color: black;
    }
  }
  // 退出登录
  .tuichu {
    margin-top: 4px;
    text-align: center;
    span {
      color: #d76261;
    }
  }
}
</style>
