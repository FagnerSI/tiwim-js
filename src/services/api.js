import axios from 'axios';

const dev = false;

const baseURL = dev ? process.env.REACT_APP_API_URL : 'http://tiwim-api.herokuapp.com/v1';

const api = axios.create({ baseURL });

export default api;
