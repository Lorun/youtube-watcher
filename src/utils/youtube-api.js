import axios from 'axios';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyDwix3BX_pYN0y12lP3AzTYzsHrFmTx2x8';

const CancelToken = axios.CancelToken;
let cancel = undefined;

const buildApiRequest = (url, key, headers = {}) => {
  const maxResult = 7;
  const baseURL = `${url}?part=snippet&maxResults=${maxResult}&key=${key}`;

  return axios.create({
    baseURL,
    headers,
  });
};

const request = buildApiRequest(API_URL, API_KEY);

const api = {
  search: function(q) {
    if (typeof cancel === 'function') {
      cancel();
    }

    return request.get('', {
      params: { q },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    });
  },
};

export default api;