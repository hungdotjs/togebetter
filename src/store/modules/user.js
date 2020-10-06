const state = () => ({
  isLogin: false,
});

const actions = {
  updateIsLogin({ commit }, status) {
    commit('updateIsLogin', status);
  },
};

const mutations = {
  updateIsLogin(state, status) {
    state.isLogin = status;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
