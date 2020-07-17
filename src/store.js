import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null,
  },
  mutations: {
    SET_ME(state, me) {
      state.me = me
    }
  },
  actions: {
    async FetchMe({ commit }) {
      const success = await axios.get('/api/me');
      commit('SET_ME', success.data)
      return success;
    }
  }
})
