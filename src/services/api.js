import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vcaixa-dev.herokuapp.com/api'
});

export default api;