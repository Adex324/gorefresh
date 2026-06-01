import axios from "axios";

const api = axios.create({
    baseURL: "https://gorefreshbackend-production.up.railway.app",

});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refresh = localStorage.getItem('refresh_token');
        const res = await axios.post(
          'https://gorefreshbackend-production.up.railway.app/users/token',
          { refresh_token: refresh }
        );
        const newToken = res.data.data.tokens.access_token;
        localStorage.setItem('token', newToken);
        // retry the original request with new token
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return api(error.config);
      } catch {
        // refresh failed, send to login
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;