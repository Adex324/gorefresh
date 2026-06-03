// src/api/authApi.js
import axios from 'axios';

const authApi = axios.create({
  baseURL: "https://gorefreshbackend-production.up.railway.app",
  // No request/response interceptors – clean for login/signup
});

export default authApi;