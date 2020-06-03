import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('@AuthToken');
const headers = { 'Authorization': `Token ${token}` }
const api = axios.create({ baseURL, headers });

export default api;
