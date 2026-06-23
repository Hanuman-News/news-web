import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
  // withCredentials: true, // if using cookies
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default api;
