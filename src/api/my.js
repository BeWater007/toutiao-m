import axios from '../utils/request.js'
export const getMyIofo = () => {
  return axios({
    url: '/v1_0/user',
    method: 'GET'
  })
}
export const changeInfo = (data) => {
  return axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
export const getInfo = () => {
  return axios({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
export const updatePhoto = (data) => {
  return axios({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}