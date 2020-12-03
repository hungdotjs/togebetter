import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
//   headers: {
//     'x-rapidapi-key': '6599376e17msha80b571b60ddfd4p1b63e5jsn782bd5bf0c26',
//     'x-rapidapi-host': 'translated-mymemory---translation-memory.p.rapidapi.com',
//   },
// };

const translator = (text, langpair) => {
  return axios.get('https://api.mymemory.translated.net/get', {
    params: {
      langpair,
      q: text,
      de: 'hungteddy98@gmail.com',
    },
  });
};

export default translator;
