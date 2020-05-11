import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 当前登录用户的登录状态token
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 把数据放到本地存储中，防止刷新丢失
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
