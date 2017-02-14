import axios from 'axios';

const API = (url) => {
  return axios.post('http://localhost:8888/v1/shorten', { url })
    .then(response => response.data.data)
    .catch(error => {
      throw error;
    });
};

export default API;
