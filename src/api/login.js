import axios from '../utils/request.js'
export const login = (data) => {
  return axios({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const getYzm = (mobile) => {
  return axios({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
