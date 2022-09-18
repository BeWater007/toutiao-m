import { login, getYzm } from "./login"; // 登录请求
import { getMyIofo,getInfo,changeInfo,updatePhoto } from "./my";
import {
  getMypindao,
  getArtList,
  getAllList,
  addChannel,
  delChannel,
} from "./home";
import { getSearchSuggestions, getSearchResults } from "./search";
import {
  getArticleById,
  followById,
  delFollowById,
  isSelected,
  delSelect,
  goodJob,
  badJob,
  loadComments,
  commentLiking,
  delCommentLiking,
  postComment
} from "./article";
export const loginAPI = login;
export const getYzmAPI = getYzm;
export const getMypindaoAPI = getMypindao;
export const getArtListAPI = getArtList;
export const getAllListAPI = getAllList;
export const addChannelAPI = addChannel;
export const delChannelAPI = delChannel;
export const getMyIofoAPI = getMyIofo;
export const getSearchSuggestionsAPI = getSearchSuggestions;
export const getSearchResultsAPI = getSearchResults;
export const getArticleByIdAPI = getArticleById;
export const followByIdAPI = followById;
export const delFollowByIdAPI = delFollowById;
export const isSelectedAPI = isSelected;
export const delSelectAPI = delSelect;
export const goodJobAPI = goodJob;
export const badJobAPI = badJob;
export const loadCommentsAPI = loadComments;
export const commentLikingAPI = commentLiking;
export const delCommentLikingAPI = delCommentLiking;
export const postCommentAPI = postComment;
export const getInfoAPI = getInfo;
export const changeInfoAPI = changeInfo;
export const updatePhotoAPI = updatePhoto;
