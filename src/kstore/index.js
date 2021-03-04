import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter: (state) => {
      return state.counter * 2
    }
  },
  mutations: {
    add (state) {
      //1.state从何而来
      state.counter++
    }
  },
  actions: {
    add ({ commit }) {
      //异步方法
      setTimeout(() => commit('add'), 1000)
    }
  },
  modules: {}
})