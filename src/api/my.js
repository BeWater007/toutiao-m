import axios from '../utils/request.js'
export const getMyIofo = () => {
  return axios({
    url: '/v1_0/user',
    method: 'GET'
  })
}
