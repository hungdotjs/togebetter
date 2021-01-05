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
      console.log(response);
    });
  },

  createUser({ commit }, payload) {
    const data = payload;
    api.post('/user', data).then((response) => {
      console.log(response);
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
      console.log(response);
    });
  },

  report({ commit }, payload) {
    const { userID, message, postID } = payload;
    const uid = generateUID();
    api.post('/report', { id: uid, message, userID, postID }).then((response) => {
      console.log(response);
    });
  },
};

export default {
  namespaced: true,
  actions,
};
