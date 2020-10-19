import { auth, db } from '@/firebase.js';
import { Message } from 'element-ui';

const state = () => ({
  accessToken: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).stsTokenManager.accessToken
    : null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
});

const actions = {
  signUp({ commit }, payload) {
    commit('updateLoading', true);
    const { email, password } = payload;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Update profile
        res.user
          .updateProfile({
            displayName: payload.username,
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Favatar-default.webp?alt=media&token=22fe2ae6-3a19-48cd-9fab-582df2d2f879',
          })
          .then(() => {
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(res.user));
          });

        const { password, ...profile } = payload;
        const user = {
          uid: res.user.id,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Favatar-default.webp?alt=media&token=22fe2ae6-3a19-48cd-9fab-582df2d2f879',
          ...profile,
        };

        // Save to Firestore
        db.collection('users')
          .doc(res.user.uid)
          .set(user)
          .then(() => {
            commit('updateLoading', false);
            // Save user and token to store
            commit('saveUser', {
              user,
              accessToken: res.user.ya,
            });

            window.location.replace('/home');
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        commit('updateLoading', false);
        Message.error(errorMessage);
      });
  },

  signIn({ commit }, payload) {
    commit('updateLoading', true);

    const { email, password } = payload;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(res.user));

        const user = {
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
        };
        // Save user and token to store
        commit('saveUser', {
          user,
          accessToken: res.user.ya,
        });
        commit('updateLoading', false);
        window.location.replace('/home');
      })
      .catch((error) => {
        const errorMessage = error.message;
        Message.error(errorMessage);
        commit('updateLoading', false);
      });
  },

  signOut({ commit }) {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      commit('signOut');
    });
  },
};

const mutations = {
  saveUser(state, { accessToken, user }) {
    state.accessToken = accessToken;
    state.user = user;
  },

  signOut(state) {
    state.accessToken = '';
    state.user = null;
  },

  updateLoading(state, status) {
    state.loading = status;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
