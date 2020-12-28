/* eslint-disable no-unused-vars */
import { auth, EmailAuthProvider } from '@/firebase.js';

const state = () => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
});

const actions = {
  signOut({ commit }) {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('languageCode');
      commit('signOut');
    });
  },

  changePassword({ state, commit }, { oldPassword, newPassword }) {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      state.user.email, // references the user's email address
      oldPassword,
    );

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated.
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log('Password update successful!');
          })
          .catch((error) => {
            console.log('An error occurred while changing the password:', error);
          });
      })
      .catch((error) => {
        console.log('Some kinda bug: ', error);
      });
  },
};

const mutations = {
  saveUser(state, user) {
    state.user = user;
  },

  signOut(state) {
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
