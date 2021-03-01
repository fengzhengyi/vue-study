import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {

  },
  mutations: {
    add (state) {
      //1.state从何而来
      state.counter++
    }
  },
  actions: {},
  modules: {}
})