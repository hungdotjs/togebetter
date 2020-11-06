const state = () => ({
  isRefreshHome: false,
});

const actions = {
  refreshHome({ commit }, flag) {
    commit('refreshHome', flag);
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
