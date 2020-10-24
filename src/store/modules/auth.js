import { auth } from '@/firebase.js';

const state = () => ({
  user: null,
});

const actions = {
  signOut({ commit }) {
    auth.signOut().then(() => {
      commit('signOut');
    });
  },
};

const mutations = {
  saveUser(state, user) {
    state.user = user;
  },

  signOut(state) {
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
