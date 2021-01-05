import { analytics } from '@/firebase';

const actions = {
  login(method) {
    analytics.logEvent('login', {
      method,
    });
  },

  signUp(method) {
    analytics.logEvent('sign_up', {
      method,
    });
  },

  ask(payload) {
    analytics.logEvent('ask', payload);
  },

  createPost(payload) {
    analytics.logEvent('create_post', payload);
  },

  answer(payload) {
    analytics.logEvent('answer', payload);
  },
};

export default {
  namespaced: true,
  actions,
};
