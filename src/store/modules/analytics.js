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
};

export default {
  namespace: true,
  actions,
};
