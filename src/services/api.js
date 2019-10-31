import axios from 'axios';

const baseURL = 'http://tiwim-api.herokuapp.com/v1';

const api = axios.create({ baseURL });

export default api;
