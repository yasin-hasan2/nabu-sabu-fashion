import axios from "axios";

const API = axios.create({
  // baseURL:
  //   import.meta.env.VITE_API_URL || "https://nabu-sabu-fashion.onrender.com",
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies with every request
});

console.log("API base URL:", API.defaults.baseURL);
console.log("API base URL:", API);

export default API;
