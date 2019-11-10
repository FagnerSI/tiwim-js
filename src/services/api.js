import axios from 'axios';

const dev = true;

const baseURL = dev ? 'http://localhost:8000/v1/' : 'http://tiwim-api.herokuapp.com/v1';

const api = axios.create({ baseURL });

export default api;
