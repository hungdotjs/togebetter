/* eslint-disable no-unused-vars */
import { auth } from '@/firebase.js';

const state = () => ({
  userId: '',
  accessToken: '',
});

const actions = {
  createUser({ commit }, payload) {
    const { email, password } = payload;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: payload.name,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Favatar-default.webp?alt=media&token=22fe2ae6-3a19-48cd-9fab-582df2d2f879',
        });

        // Save user and token to store
        commit('saveUser', {
          accessToken: res.user.ya,
          userId: res.user.uid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  },

  signIn({ commit }, payload) {
    const { email, password } = payload;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        // Save user and token to store
        commit('saveUser', {
          accessToken: res.user.ya,
          userId: res.user.uid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  },

  signOut({ commit }) {
    auth.signOut().then(() => {
      commit('signOut');
    });
  },
};

const mutations = {
  saveUser(state, { userId, accessToken }) {
    state.userId = userId;
    state.accessToken = accessToken;
  },

  signOut(state) {
    state.userId = '';
    state.accessToken = '';
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
