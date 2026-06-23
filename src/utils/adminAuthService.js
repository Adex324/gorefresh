const API_BASE = import.meta.env.VITE_API_BASE_URL;

export class AuthService {
  static ACCESS_TOKEN_KEY = "admin_token";
  static REFRESH_TOKEN_KEY = "admin_refresh_token";
  static USER_DATA_KEY = "user_data";

  static isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getAccessToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static getUserData() {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(this.USER_DATA_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static saveAuthData(accessToken, refreshToken, userData) {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }

  static logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  static async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE}/users/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (response.ok) {
        const json = await response.json();
        const newAccess = json.data?.tokens?.access_token;
        const newRefresh = json.data?.tokens?.refresh_token;
        if (newAccess) {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, newAccess);
          if (newRefresh)
            localStorage.setItem(this.REFRESH_TOKEN_KEY, newRefresh);
          return true;
        }
      }
    } catch (err) {
      console.error("Token refresh failed", err);
    }
    return false;
  }

  static async authenticatedRequest(url, options = {}) {
    let accessToken = this.getAccessToken();
    if (!accessToken) throw new Error("No access token");

    const makeRequest = (token) =>
      fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

    let response = await makeRequest(accessToken);

    if (response.status === 401) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        accessToken = this.getAccessToken();
        if (accessToken) response = await makeRequest(accessToken);
        else throw new Error("Still no token after refresh");
      } else {
        this.logout();
        if (typeof window !== "undefined") window.location.href = "/login";
        throw new Error("Session expired");
      }
    }
    return response;
  }

  static async fetchAndStoreUser() {
    try {
      const res = await this.authenticatedRequest(`${API_BASE}/users/me`);
      if (res.ok) {
        const json = await res.json();
        const user = json.data;
        if (user) {
          localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
          return user;
        }
      }
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
    return null;
  }
}
