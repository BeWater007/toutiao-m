<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情，只要有文章就显示文章页面 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | timer }}
          </div>
          <!-- 封装的关注按钮 -->
          <!-- 传过去关注状态，还有作者id,$event就是子组件传过来的值 -->
          <!-- <FollowUser
            :isFollowed="article.is_followed"
            :userId="article.aut_id"
            @onFollow="article.is_followed = $event"
            class="follow-btn"
          /> -->
          <!-- 一个子组件只能使用一次v-model，双向绑定父子传值 -->
          <FollowUser
            v-model="article.is_followed"
            :userId="article.aut_id"
            class="follow-btn"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <!-- 获取dom拿image数组 -->
        <div
          ref="articleContent"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 这里是评论列表的区域 -->
        <CommentList
          :art_id="article.art_id"
          :list="list"
          @sendTotal_count="total_count = $event"
          @reply_click="repClik"
          type="a"
        ></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="total_count" color="#777" />
          <!-- 这是收藏组件，需要传收藏状态 -->
          <CollectArticle v-model="article.is_collected" :id="article.art_id" />
          <GoodJob v-model="article.attitude" :id="article.art_id" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <!-- 未知错误就点击重新加载 -->
        <van-button class="retry-btn" @click="getArtcle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 添加评论弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <!-- 弹出层内部的组件 -->
      <CommentPost
        :id="article.art_id"
        :list="list"
        @postComment="postFn"
      ></CommentPost>
    </van-popup>
    <!-- 点击回复弹出层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 弹出层内部的组件 -->
      <commentReply
        v-if="isReplyShow"
        :commentItem="currentComment"
        @reply_colse="isReplyShow = false"
      ></commentReply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleByIdAPI } from "@/api";
import FollowUser from "../../components/followUser.vue";
import CollectArticle from "../../components/collect-article.vue";
import GoodJob from "../../components/good-job.vue";
import "./github-markdown.css";
import { ImagePreview } from "vant"; //图片预览插件
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import commentReply from "./components/comment-reply.vue";
export default {
  name: "ArticleIndex",
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  // 给所有的后代组件提供数据
  // 然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的属性
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  data() {
    return {
      article: {},
      loading: true, //控制loading的页面的显示
      status: 0,
      isFollow: false,
      followLoading: false, //按钮的loading效果
      list: [], //评论列表提升到父组件，方便修改
      total_count: 0,
      isPostShow: false, //控制添加评论的弹层显示与隐藏
      isReplyShow: false, //控制评论回复弹出层的显示与隐藏
      currentComment: {}, //接收评论项的对象
    };
  },
  components: {
    FollowUser,
    CollectArticle,
    GoodJob,
    CommentList,
    CommentPost,
    commentReply,
  },
  created() {
    this.getArtcle();
  },
  methods: {
    // 开页面就获取用户个人资料
    async getArtcle() {
      //重新加载时就让loading变为true
      this.loading = true;
      try {
        // if (Math.random() > 0.5) JSON.parse("fds");
        const { data } = await getArticleByIdAPI(this.articleId);
        // console.log("111", data.content);
        this.article = data;
        // console.log(2);
        // 数据加载成功以后再去调用图片预览的方法,因为要操作dom是异步的，所以要使用nexttick
        // this.$nextTick(() => {
        //   this.PreviewFn();
        // });
        //todo
        setTimeout(() => {
          this.PreviewFn();
        }, 0);
      } catch (err) {
        // 报404的错误，就让404的页面展示
        // console.log("111111", err);
        if (err.response && err.response.status === 404) {
          this.status = 404;
        }
      }
      //不论加载成功还是失败都不应该显示loading页面，设置为false
      this.loading = false;
    },
    // 抽离触发图片的预览函数
    PreviewFn() {
      const imgs = this.$refs["articleContent"]?.querySelectorAll("img");
      // console.log(imgs);
      // 遍历图片数组，将图片的src属性存入一个数组
      const imgArr = [];
      imgs?.forEach((img, index) => {
        imgArr.push(img.src);
        img.onclick = () => {
          // 调用vant预览方法
          ImagePreview({
            images: imgArr,
            startPosition: index,
          });
        };
      });
      // console.log(imgArr)
    },
    // 当用户添加了评论，父组件关闭弹层，评论总数++
    postFn() {
      (this.isPostShow = false), this.total_count++;
    },
    // 用户点击回复评论，打开弹层，将评论项送到评论回复组件内
    repClik(commentItem) {
      (this.isReplyShow = true), (this.currentComment = commentItem);
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 9px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 23px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
