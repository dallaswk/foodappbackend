import { createStore } from 'vuex'

export default createStore({
  state: {
    uid: null
  },
  getters: {
  },
  mutations: {
    actualizarUid (state, uid) {
      state.uid = uid
    }
  },
  actions: {
    actualizarUid ({ commit }, uid) {
      commit('actualizarUid', uid)
    }
  },
  modules: {
  }
})
