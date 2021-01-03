/* eslint-disable no-unused-vars */
import axios from 'axios';

axios.defaults.baseURL = 'https://test-deploy-express.herokuapp.com';
axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };

const actions = {
  log({ commit }, payload) {
    const { userID, action } = payload;
    // axios.post('/log', { action, userId: userID }).then((response) => {
    //   console.log(response);
    // });
  },

  ask({ commit }, payload) {},
};

export default {
  namespaced: true,
  actions,
};
