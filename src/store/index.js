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
    addTravels(state, payload) {
      state.travels = [...state.travels, payload];
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
      return state.travels.filter((travel) =>
        travel.title.toLowerCase().includes(state.search.toLowerCase()),
      );
    },
  },
  actions: {
    async getTravelsArray({ commit, state }) {
      try {
        commit('setLoading');

        const travels = await fetch(state.url);
        if (!travels.ok) {
          throw new Error('Incorrect url');
        }
        const data = await travels.json();

        commit('setLoading');
        commit('setTravels', data);
      } catch (err) {
        commit('setError', err.message);
      }
    },
    async addNewTravel({ commit, state }, payload) {
      try {
        const travels = await fetch(state.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await travels.json();

        commit('addTravels', data);
      } catch (err) {
        commit('setError', err.message);
      }
    },
    async deleteTravel({ commit, dispatch }, payload) {
      try {
        await fetch(payload, {
          method: 'DELETE',
        });

        dispatch('getTravelsArray');
      } catch (err) {
        commit('setError', err.message);
      }
    },
    async getTravelForEdit({ commit }, url) {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const title = data.title;
        const price = data.price;
        const location = data.location;

        return { title, price, location };
      } catch (err) {
        commit('setError', err.message);
      }
    },
    async editTravel({ commit, dispatch }, { url, payload }) {
      try {
        await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        dispatch('getTravelsArray');
      } catch (err) {
        commit('setError', err.message);
      }
    },
  },
  modules: {},
});
