// 获取推荐的频道列表
import axios from '../utils/request.js'
export const getMypindao = () => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
// 获取文章分类的列表
export const getArtList = (params) => {
  return axios({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
// 获取所有频道列表
export const getAllList = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 添加频道
export const addChannel = (channel) => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: { channels: [channel] }
  })
}
// 删除频道
export const delChannel = (channelId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
