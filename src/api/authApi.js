// src/api/authApi.js
import axios from 'axios';

const authApi = axios.create({
  baseURL: "/api",
  // No request/response interceptors – clean for login/signup
});

export default authApi;