<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>
    <template #label>
      <!-- 三张图片的时候 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <!-- 下方评论信息 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate |timer }}</span>
      </div>
    </template>
    <!-- 一张图片的时候 -->
    <template>
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 12px;
  }

  .right-cover {
    width: 116px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 12px;
    color: #b4b4b4;
    margin-right: 12px;
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;
    //.cover-item:last-child : 选择最后一个子元素
    //.cover-item:not(:last-child) : 选择非最后一个子元素
    .cover-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        //嵌套语法里&代表父元素.cover-item
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
