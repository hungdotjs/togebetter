const state = () => ({
  isRefreshHome: false,
  listUsers: [],
});

const actions = {
  refreshHome({ commit }, flag) {
    commit('refreshHome', flag);
  },

  addUser({ state, commit }, user) {
    const index = state.listUsers.find((item) => item.id === user.id);
    if (!index) {
      commit('addUserToList', user);
    }
  },
};

const mutations = {
  refreshHome(state, flag) {
    state.isRefreshHome = flag;
  },

  addUserToList(state, user) {
    state.listUsers.push(user);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
