import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import ui from './modules/ui';
import analytics from './modules/analytics';
import api from './modules/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, ui, analytics, api },
  strict: process.env.NODE_ENV !== 'production',
});
