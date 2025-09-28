// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // backend URL from .env
  withCredentials: true, // if you're using cookies/auth
});

export default API;
