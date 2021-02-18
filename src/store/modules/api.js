/* eslint-disable no-unused-vars */
import axios from 'axios';
import generateUID from '@/helpers/generateUID';

const api = axios.create({
  baseURL: 'https://test-deploy-express.herokuapp.com',
});

const actions = {
  log({ commit }, payload) {
    const { userID, action } = payload;
    const uid = generateUID();
    api.post('/log', { id: uid, action, userId: userID }).then((response) => {
      console.log('log', response.status);
    });
  },

  createUser({ commit }, payload) {
    const data = payload;
    api.post('/user', data).then((response) => {
      console.log('create user', response.status);
    });
  },

  ask({ commit }, payload) {
    const {
      id,
      ownerID,
      type,
      lang,
      content,
      additionalInfomation,
      audioURL,
      photoURL,
      questionType,
      comments,
      featuredAnswer,
      status,
    } = payload;
    const data = {
      id,
      userID: ownerID,
      type,
      lang,
      content,
      additionalInfomation,
      audioURL,
      photoURL,
      questionType,
      comments,
      featuredAnswer,
      votes: '0',
      status,
    };

    api.post('/question', data).then((response) => {
      console.log('ask', response.status);
    });
  },

  answer({ commit }, payload) {
    api.put('/question', payload).then((response) => {
      console.log('answer', response.status);
    });
  },

  report({ commit }, payload) {
    const uid = generateUID();
    api.post('/report', { id: uid, ...payload }).then((response) => {
      console.log('report', response.status);
    });
  },
};

export default {
  namespaced: true,
  actions,
};
