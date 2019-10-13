import axios from 'axios';

const baseURL = 'http://localhost:8000/v1';
/* const headers = {
    'Access-Control-Allow-Origin': 'Authorization'
} */

const api = axios.create({ baseURL });

export default api;
