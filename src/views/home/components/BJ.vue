<template>
  <div class="bj-container">
    <!-- 我的频道 -->
    <div class="my-pd">
      <van-cell class="my-cell">
        <template #title>
          <span>我的频道</span>
        </template>
        <template #right-icon>
          <van-button
            type="default"
            size="mini"
            border="false"
            round
            class="bj-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? "完成" : "编辑" }}</van-button
          >
        </template>
      </van-cell>
      <!-- 我的频道宫格 -->
      <van-grid :gutter="11">
        <van-grid-item
          v-for="(item, index) in pdList"
          :key="index"
          class="my-grid"
          @click="changeFn(item, index)"
        >
          <template #icon>
            <!-- 显示的时候isEdit控制，且不能包含数组中声明的id用于默认显示的频道 -->
            <van-icon name="close" v-show="isEdit && !stay.includes(item.id)" />
          </template>
          <template #text>
            <span class="text" :class="{ act: index === active }">{{
              item.name
            }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 频道推荐-->
    <div class="tj-pd">
      <van-cell class="my-cell">
        <template #title>
          <span>频道推荐</span>
        </template>
      </van-cell>
      <!-- 频道推荐宫格 -->
      <van-grid :gutter="11">
        <van-grid-item
          v-for="(item, index) in tjList"
          :key="index"
          icon="plus"
          @click="addFn(item)"
        >
          <template #text>
            <span class="text">{{ item.name }}</span>
          </template></van-grid-item
        >
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage'
import { addChannelAPI, delChannelAPI } from '@/api'
export default {
  data () {
    return {
      isEdit: false,
      stay: [0]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  props: {
    pdList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    tjList: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 点击推荐频道的宫格，添加到我的频道
    async addFn (item) {
      this.pdList.push(item)
      // 数据持久化用户登录就掉接口添加频道，
      if (this.user.token) {
        try {
          await addChannelAPI({
            id: item.id,
            seq: this.pdList.length
          })
        } catch (err) {
          this.$toast('新增频道失败，请稍后再试')
        }
      } else {
        // 没有登陆就加入本地存储
        setItem('pdList', this.pdList)
      }
    },
    // 点击我的频道的宫格
    async changeFn (item, index) {
      // 如果在编辑的状态，点击删除
      if (this.isEdit) {
        // 判断删除的是默认的频道就终止函数
        if (this.stay.includes(item.id)) return
        // 编辑状态，删除
        // 当删除高亮项前面的时候，让高亮的索引减一，不然会错乱一位
        if (index < this.active) {
          // console.log(index);
          this.$emit('changeActive', this.active - 1, true)
        }
        // 删数据
        this.pdList.splice(index, 1)
        // 实现数据的持久化
        if (this.user.token) {
          try {
            await delChannelAPI(item.id)
          } catch (err) {
            this.$toast('删除频道失败，请稍后再试')
          }
        } else {
          // 没有登陆就加入本地存储
          setItem('pdList', this.pdList)
        }
      } else {
        //  非编辑状态，跳转
        this.$emit('changeActive', index, false)
      }
    }
  }
}
</script>
<style  scoped lang="less">
.bj-container {
  padding-top: 42px;
  .my-cell {
    color: #333;
    font-size: 16px;
    .bj-btn {
      width: 52px;
      height: 25px;
      color: #cb6f6d;
      border: 1px solid #cb6f6d;
    }
  }
  /deep/ .van-grid-item__content--center {
    background-color: #f3f6f6;
    width: 80px;
    height: 42px;
    .van-grid-item__text,
    .text {
      font-size: 14px;
      color: #333;
    }
  }
  .my-pd {
    /deep/ .van-grid-item__content {
      padding: 0;
      .van-icon-close {
        position: absolute;
        font-size: 14px;
        top: -18px;
        right: -45px;
        z-index: 2;
        color: #333;
      }
    }
  }
  .tj-pd {
    /deep/ .van-grid-item__content {
      padding: 0;
      flex-direction: row;
      .van-icon:before {
        font-size: 12px;
      }
      .van-icon-plus {
        font-size: 14px;
        margin-right: 3px;
      }
    }
  }
  /deep/ .van-grid-item__icon + .van-grid-item__text {
    margin-top: 1px;
  }
  .act {
    color: orangered !important;
  }
}
</style>
