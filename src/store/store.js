import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, setToken, removeToken} from "../utils/auth";
import {getUserInfo, login, logout} from "../api/user.api"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken(),
    user: null
  },
  getters:{
    token(state){
      return state.token
    },
    userName(state){
      return state.user.name.toUpperCase()
    },
    email(state){
      return state.user.email
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    REMOVE_TOKEN(state){
      state.token = null
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    getUser({commit}) {
      return new Promise((resolve,reject)=>{
        getUserInfo()
          .then(response => {
            commit('SET_USER',response);
            resolve(response)
          })
          .catch(err => {
            removeToken();
            reject(err)
          })

      })
    },
    loginByEmail({commit}, {credential,remember}) {
      return new Promise((resolve, reject) => {
        login(credential)
          .then(response => {
            commit('SET_TOKEN', response.access_token);
            setToken(response.access_token,remember);
            resolve(response)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    signOut({commit}){
      return new Promise((resolve => {
        logout()
          .then(()=>{
            commit('REMOVE_TOKEN')
            removeToken()
            resolve()
          })
      }))
    }
  }
})