const state = () => ({
  isRefreshHome: false,
});

const actions = {
  refreshHome({ commit }) {
    commit('refreshHome', true);
  },
};

const mutations = {
  refreshHome(state, flag) {
    state.isRefreshHome = flag;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
