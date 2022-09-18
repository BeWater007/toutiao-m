import axios from "../utils/request.js";
// 通过id获取文章详情
export const getArticleById = (article_id) => {
  return axios({
    url: `/v1_0/articles/${article_id}`,
    method: "GET",
  });
};

export const followById = (target) => {
  return axios({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
};
export const delFollowById = (target) => {
  return axios({
    url: `/v1_0/user/followings/${target}`,
    method: "DELETE",
  });
};
// 收藏文章
export const isSelected = (target) => {
  return axios({
    url: `/v1_0/article/collections`,
    method: "POST",
    data: {
      target,
    },
  });
};
// 取消收藏文章
export const delSelect = (target) => {
  return axios({
    url: `/v1_0/article/collections/${target}`,
    method: "DELETE",
  });
};
// 点赞文章
export const goodJob = (target) => {
  return axios({
    url: `/v1_0/article/likings`,
    method: "POST",
    data: {
      target,
    },
  });
};
// 取消点赞文章
export const badJob = (target) => {
  return axios({
    url: `/v1_0/article/likings/${target}`,
    method: "DELETE",
  });
};
// 获取文章评论或评论回复
export const loadComments = (params) => {
  return axios({
    url: "/v1_0/comments",
    method: "GET",
    params,
  });
};
// 对评论点赞
export const commentLiking = (target) => {
  return axios({
    url: `/v1_0/comment/likings`,
    method: "POST",
    data: {
      target,
    },
  });
};
// 取消评论点赞
export const delCommentLiking = (target) => {
  return axios({
    url: `/v1_0/comment/likings/${target}`,
    method: "DELETE",
  });
};
// 添加评论
export const postComment = (data) => {
  return axios({
    url: `/v1_0/comments`,
    method: "POST",
    data
  });
};