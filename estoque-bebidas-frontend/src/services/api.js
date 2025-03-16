import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9563",
});

export default api;
