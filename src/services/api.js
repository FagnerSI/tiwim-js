import axios from 'axios';

export default function api() {
    const baseURL = process.env.REACT_APP_API_URL;
    let token = localStorage.getItem('@AuthToken');
    let headers = token && { 'Authorization': `Token ${token}` };

    return axios.create({ baseURL, headers });
};
