<template>
  <div>
    <!-- 头部标题 -->
    <van-nav-bar class="abc" title="登录" />
    <!-- 输入框 -->
    <van-form @submit="onSubmit" ref="yzmBtn">
      <!-- 手机号输入框 -->
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <!-- 手机图标插槽 -->
        <template slot="left-icon">
          <i class="cs cs-shouji"></i>
        </template>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field
        name="code"
        v-model="user.code"
        type="text"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <!-- 验证码按钮插槽 -->
        <!-- native-type="button"这样不会让验证码按钮触发提交事件 -->
        <template #button>
          <van-count-down :time="1000 * 3" format="ss s" v-if="isShow" @finish='{isShow=false}'/>
          <van-button
            v-else
            color="#ccc"
            size="small"
            type="primary"
            round
            class="yzmBtn"
            native-type="button"
            @click="sendYzm"
            >发送验证码
          </van-button>
        </template>
        <!-- 验证码左侧图标插槽 -->
        <template slot="left-icon">
          <i class="cs cs-yanzhengma"></i>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="loginBtn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, getYzmAPI } from '@/api'
export default {
  data () {
    return {
      user: {
        mobile: '13111111111', // 手机号
        code: '' // 验证码
      },
      // 控制验证码按钮和倒计时显示
      isShow: false,
      userFormRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[345678]\d{9}$/,
            message: '请输入正确格式的手机号'
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },

  methods: {
    // 点击提交按钮
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 默认是两秒，值为零时不会消失，不过新的toast调用，都会把之前的关闭
      })
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        this.$store.commit('setUsers', res.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登录失败，请稍候重试', err)
          this.$toast.fail('登录失败，请稍候重试')
        }
      }
    },
    // 点击发送验证码
    async sendYzm () {
      // 1.校验手机号是否合法
      try {
        await this.$refs.yzmBtn.validate('mobile') // 指定触发手机号的验证,返回是一个promise
      } catch (err) {
        return console.log(`"验证失败:" ${err}`)
      }
      // 2.显示倒计时
      this.isShow = true
      // 3.发送验证码
      try {
        // 发送成功提示用户成功
        await getYzmAPI(this.user.mobile)
        this.$toast('获取验证码成功')
      } catch (err) {
        //  发送失败将不再显示倒计时
        this.isShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('获取验证码失败，请稍后再试')
        }
      }
    }
  }
}
</script>
<style  scoped>
.van-nav-bar {
  background-color: pink;
}
.loginBtn {
  border-radius: 4px;
}
.yzmBtn {
  height: 25px;
}
</style>
