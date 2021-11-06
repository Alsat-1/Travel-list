import { createStore } from 'vuex';

export default createStore({
  state: {
    trips: [],
    error: null,
  },
  mutations: {
    setTrips(state, payload) {
      state.trips = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  getters: {},
  actions: {
    async getTripsArray({ commit }) {
      try {
        const trips = await fetch('http://localhost:3000/trips');
        const response = await trips.json();

        commit('setTrips', response);
      } catch (err) {
        commit('setError', err.message);
      }
    },
  },
  modules: {},
});
