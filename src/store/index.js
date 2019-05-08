import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatarPartUrl: 'static/avatar/'
  },
  modules: {
    account,
    setting
  }
})
