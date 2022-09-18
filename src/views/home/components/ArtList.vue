<template>
  <div class="ArtList">
    <!-- 下拉刷新的容器 -->
    <van-pull-refresh
      :success-text="refreshSuccessText"
      :success-duration="1500"
      v-model="isRefreshLoading"
      @refresh="onRefresh"
    >
      <!-- 文章列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <!-- 每篇文章的组件 -->
        <ArtItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArtItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from '@/api'
import ArtItem from './ArtItem.vue'
export default {
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false, // 是否加载失败
      // 控制下拉刷新的失败状态
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  components: {
    ArtItem
  },
  methods: {
    // 当触发下拉刷新的时候调用该函数
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArtListAPI({
          channel_id: this.obj.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajndjsa')
        // }
        // 2. 将数据追加到列表的顶部
        const { results } = data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false // 关闭下拉刷新的 loading 状态
      }
    },
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArtListAPI({
          channel_id: this.obj.id, // 频道 id
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          timestamp: this.timestamp || Date.now(), // 时间戳，请求最新数据传当前的时间戳，请求某一刻的数据就传递具体的一个时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }

        // 2. 把数据添加到 list 数组中
        const { results } = data // （这个是请求回来的结果数据）
        // 数组的展开操作符...，它会把数组元素一个一个拿出来
        this.list.push(...results) // （将结果数据拆包之后，加到list中）
        // console.log(this.list)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false // （隐藏加载中）
        // 更新获取下一页数据的时间戳
        this.timestamp = data.pre_timestamp
        // 4. 判断数据是否全部加载完成：（如果长度为0说明没有数据）
        if (results.length < 10) {
          this.finished = true // (显示没有更多)
        }
      } catch (err) {
        console.log(err)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    }
  }
}
</script>
<style  scoped>
.ArtList {
  height: 76vh;
  overflow-y: auto;
}
</style>
