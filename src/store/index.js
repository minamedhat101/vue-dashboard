import Vue from 'vue'
import Vuex from 'vuex'
import views from './modules/views'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  modules: {
    views,
    auth,
  }
})
