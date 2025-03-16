import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", 
  withCredentials: true, // If using authentication
});

export default API;