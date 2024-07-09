import axios from "axios";
//crea un cliente de axios con una url base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
/*los interceptors son propios de axios y basicamente son funciones
 que se ejecutan antes o despues de una solicitud http*/
//--REQUEST-- es antes de la solicitud y RESPONSE es para despues
api.interceptors.request.use((config) => {
  //tomando el jwt del locale storage
  const JWtoken = localStorage.getItem("AUTH_TOKEN");
  if (JWtoken) {
    //envias los headers porque el backend pide un jwt como Bearer
    config.headers.Authorization = `Bearer ${JWtoken}`;
  }
  return config;
});
export default api;
