import { createStore } from 'vuex';

export default createStore({
  state: {
    travels: [],
    error: null,
    url: 'http://localhost:3000/travels',
    isLoading: false,
    search: '',
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
    setLoading(state) {
      state.isLoading = !state.isLoading;
    },
    setSearch(state, payload) {
      state.search = payload;
    },
  },
  getters: {
    filteredTravels(state) {
      return state.travels.filter((travel) => travel.title.toLowerCase().includes(state.search.toLowerCase()));
    },
  },
  actions: {
    async getTravelsArray({ commit }) {
      try {
        commit('setLoading');

        const travels = await fetch(this.state.url);
        const response = await travels.json();

        commit('setLoading');
        commit('setTravels', response);
      } catch (err) {
        commit('setError', err.message);
      }
    },
  },
  modules: {},
});
