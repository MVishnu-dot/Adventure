//It is a central file that contains the baseurl and automatically attaches tokens in every request

import axios from "axios";

const api = axios.create({
  baseURL : "http://127.0.0.1:8000",
});

//Now i need to attach tokes for every request

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;});

export default api ;