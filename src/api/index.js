import axios from 'axios'


// API_BASEは .env で定義する
const API_BASE = "http://localhost:4000";



export class API {
  static getToken() {
    
    const token = JSON.parse(localStorage.getItem("account_info")).token;
    return token;
  }

  static async get(path, params = {}, isAuth = false) {
    if (!isAuth) {
      console.log(`${API_BASE}${path}`);
      return axios.get(`${API_BASE}${path}`, params);
    } else {
      const token = this.getToken();

      let result = null;
      try {
        result = await axios.get(`${API_BASE}${path}`, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });
      } catch (err) {
        result = err.response;
      }
      return result;
    }
  }
  static delete(path, category_id, params = {}, isAuth = false, header = {}) {
    if (!isAuth) {
      return axios.delete(`${API_BASE}${path}/${category_id}`, params, {
        headers: header,
      });
    } else {
      const token = this.getToken();
      header.Authorization = `Bearer ${token}`;

      let result = null;
      try {
        result = axios.delete(`${API_BASE}${path}${category_id}`, params, {
          headers: header,
        });
      } catch (err) {
        result = err.response;
      }
      return result;
    }
  }
  static put(path, category_id, params = {}, isAuth = false, header = {}) {
    if (!isAuth) {
      return axios.put(`${API_BASE}${path}/${category_id}`, params, {
        headers: header,
      });
    } else {
      const token = this.getToken();
      header.Authorization = `Bearer ${token}`;

      let result = null;
      try {
        result = axios.put(`${API_BASE}${path}${category_id}`, params, {
          headers: header,
        });
      } catch (err) {
        result = err.response;
      }
      return result;
    }
  }

  static async post(path, params = {}, isAuth = false, header = {}) {
    if (!isAuth) {
      return axios.post(`${API_BASE}${path}`, params, { headers: header });
    } else {
      const token = this.getToken();
      header.Authorization = `Bearer ${token}`;

      let result = null;
      try {
        result = await axios.post(`${API_BASE}${path}`, params, {
          headers: header,
        });
      } catch (err) {
        result = err.response;
      }
      return result;
    }
  }

  static login(params) {
    return this.post("/login", params);
  }

  static logout() {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    let result = null;
    try {
      result = axios.delete(`${API_BASE}/session`, { headers });
    } catch (err) {
      result = err.response;
    }
    return result;
  }

  static getAllProducts(params) {
    return this.get("/admin/products", params, false);
  }

  static getAllUser(params) {
    return this.get("/admin/users", params, false);
  }
  static getAllCategory(params) {
    return this.get("/admin/categories", params, false);
  }
  static updateCategories(id, params) {
    return this.put("/admin/categories", id, params, false);
  }
  static updateUser(id, params) {
    return this.put("/admin/users", id, params, false);
  }
  static updateProduct(id, params) {
    return this.put("/admin/products", id, params, false);
  }
  static deleteCategories(id, params) {
    return this.delete("/admin/categories/delete", id, params, false);
  }
  static deleteUser(id, params) {
    return this.delete("/admin/users/delete", id, params, false);
  }
  static deleteProduct(id, params) {
    return this.delete("/admin/products/delete", id, params, false);
  }
}

