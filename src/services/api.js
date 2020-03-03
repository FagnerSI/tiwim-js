import axios from 'axios';

const PROD_URL = 'https://tiwim-api.herokuapp.com/v1';
const baseURL = /* process.env.REACT_APP_API_URL || */ PROD_URL;

const api = axios.create({ baseURL });

export default api;
