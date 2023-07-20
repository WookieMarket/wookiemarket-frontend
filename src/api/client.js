import axios from 'axios';

window.config = JSON.stringify(process.env);

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(response => response.data);

export default client;