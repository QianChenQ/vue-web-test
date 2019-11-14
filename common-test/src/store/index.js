import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiList: []
  },
  mutations: {
    replaceApiList: function (state, payload) {
      state.apiList.splice(0)
      state.apiList = state.apiList.concat(payload)
    },
    deleteApiListByName: function (state, name) {
      for (let j = state.apiList.length - 1; j >= 0; j--) {
        if (state.apiList[j].aliasName === name) {
          state.apiList.splice(j, 1)
        }
      }
    }
  },
  actions: {},
  modules: {}
})
