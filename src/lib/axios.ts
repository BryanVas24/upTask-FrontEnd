import axios from "axios";
//crea un cliente de axios con una url base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
