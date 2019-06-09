import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || null,
  name: "",
  staffType: "",
  staffID:""
}

const getters = {
  loggedIn(state) {
    return state.token !== null
  },
  //Mosallem
  getName :state=>{
    return state.name
  },
  getStaffType :state=>{
    return state.staffType
  },
  getStaffID :state=>{
    return state.staffID
  },
}

const actions = {
  getProfile({ commit }, data) {
    axios.get(`/employee/profile`, {
      headers: {
        Authorization: "Bearer " + data
      }
    }).then(res => {
      const data = res.data.result.data

      // commit el state d 
      const payload = data.fristName + " " + data.lastName
      commit('setName',payload)
      commit('setStaffID',data._id)
      
      axios.get(`/userType/${data.userType}`).then(res => {
        const data = res.data;
        // let statee = {
          // name: data.name,
          // _id: data._id
          // }
          
          //commit an el statee d equal el userType
          commit('setStaffType',data.name)
      })
    }).catch(err => console.log(err))
  },

  // mina
  register(context, data) {
    return new Promise((resolve, reject) => {
      axios.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroyToken(context) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios.post('/logout')
          .then(response => {
            localStorage.removeItem('token')
            context.commit('destroyToken')
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            localStorage.removeItem('token')
            context.commit('destroyToken')
            reject(error)
          })
      })
    }
  },
  retrieveToken(context, credentials) {

    return new Promise((resolve, reject) => {
      axios.post('/login', {
        username: credentials.username,
        password: credentials.password,
      })
        .then(response => {
          const token = response.data.token

          localStorage.setItem('token', token)
          context.commit('retrieveToken', token)
          resolve(response)
          // console.log(response);
          // context.commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}

const mutations = {
  retrieveToken(state, token) {
    state.token = token
  },
  destroyToken(state) {
    state.token = null
  },
  //Mosallem
  setName: (state,payload)=>{
    state.name = payload
  },
  setStaffType: (state,payload)=>{
    state.staffType = payload
  },
  setStaffID: (state,payload)=>{
    state.staffID = payload
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}