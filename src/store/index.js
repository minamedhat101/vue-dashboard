import Vue from 'vue'
import Vuex from 'vuex'
import views from './modules/views'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  modules: {
    views,
  }
})
