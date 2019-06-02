const state={
  navBar: false,
  nn:'a'
}
const getters ={
  showNavBar:state =>{
    return state.navBar
  },
  showN:state =>{
    return state.nn
  },
}
const mutations ={
  changeNavBar : state =>{
    state.navBar = true
  },
  hideNavBar : state =>{
    state.navBar = false
  }
}
const actions ={
  changeNavBarac :({commit}) =>{
    commit('changeNavBar')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}