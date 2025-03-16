import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", 
  withCredentials: true, // If using authentication
});

export default API;