/* eslint-disable no-unused-vars */
import { analytics } from '@/firebase';

const actions = {
  login({ commit }, method) {
    analytics.logEvent('login', {
      method,
    });
  },

  signUp({ commit }, method) {
    analytics.logEvent('sign_up', {
      method,
    });
  },

  ask({ commit }, payload) {
    analytics.logEvent('ask', payload);
  },

  createPost({ commit }, payload) {
    analytics.logEvent('create_post', payload);
  },

  answer({ commit }, payload) {
    analytics.logEvent('answer', payload);
  },
};

export default {
  namespaced: true,
  actions,
};
