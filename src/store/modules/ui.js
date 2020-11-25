const state = () => ({
  isRefreshHome: false,
  listUsers: [],
  notifications: [],
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

  fetchNotifications({ commit }, payload) {
    commit('fetchNotifications', payload);
  },

  addNotifications({ commit }, payload) {
    commit('addNotifications', payload);
    // localStorage.setItem('notifications', JSON.stringify(payload));
  },
};

const mutations = {
  refreshHome(state, flag) {
    state.isRefreshHome = flag;
  },

  addUserToList(state, user) {
    state.listUsers.push(user);
  },

  addNotifications(state, data) {
    state.notifications = state.notifications.concat(data);
  },

  fetchNotifications(state, data) {
    state.notifications = data;
  },

  removeNotifications(state) {
    state.notifications = [];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
