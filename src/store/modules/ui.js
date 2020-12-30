import languages from '@/data/languages';

const state = () => ({
  isRefreshHome: false,
  listUsers: [],
  notifications: [],
  languageCode: localStorage.getItem('languageCode') ? localStorage.getItem('languageCode') : '',
  countryCode: 'US',
});

const actions = {
  refreshHome({ commit }, flag) {
    commit('refreshHome', flag);
  },

  // Cache User
  addUser({ state, commit }, user) {
    const index = state.listUsers.find((item) => item.id === user.id);
    if (!index) {
      commit('addUserToList', user);
    }
  },

  changeLanguageCode({ commit }, payload) {
    let lang = languages.find((item) => item.name === payload);
    if (lang) {
      lang = lang.code;
      commit('changeLanguageCode', lang);
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

  changeLanguageCode(state, lang) {
    localStorage.setItem('languageCode', lang);
    state.languageCode = lang;
  },

  changeCountryCode(state, countryCode) {
    state.countryCode = countryCode;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
