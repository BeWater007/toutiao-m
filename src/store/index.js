import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getItem('users') || {}
  },
  mutations: {
    setUsers (state, data) {
      // 将登陆成功传过来的用户信息存进vuex
      state.user = data
      //  进行本地存贮长久保存
      setItem('users', state.user)
    }
  },
  actions: {},
  modules: {}
})
