import { createStore } from 'vuex';

export default createStore({
  state: {
    travels: [],
    error: null,
    url: 'http://localhost:3000/travels',
  },
  mutations: {
    setTravels(state, payload) {
      state.travels = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUrl(state, payload) {
      state.url = payload;
    },
  },
  getters: {},
  actions: {
    async getTravelsArray({ commit }) {
      try {
        const travels = await fetch(this.state.url);
        const response = await travels.json();

        commit('setTravels', response);
      } catch (err) {
        commit('setError', err.message);
      }
    },
  },
  modules: {},
});
