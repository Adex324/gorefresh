import axios from 'axios';

const adminApi = axios.create({
  baseURL: '/api',   // instead of full URL
});

export default adminApi;