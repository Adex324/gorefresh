// src/api/authApi.js
import axios from 'axios';

const authApi = axios.create({
  baseURL: "/api",
  
});

export default authApi;