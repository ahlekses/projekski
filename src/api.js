import axios from 'axios';
import { ACCESS_TOKEN } from 'constants';

// For Create React App
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // Ensure the token is in the correct format (Bearer token)
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Only clear token and redirect if it's not a token refresh request
          if (!error.config.url.includes('/token/refresh/')) {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem('USER_ROLE');
            window.location.href = '/sign-in';
          }
          break;
        case 403:
          // Forbidden - show error message
          console.error('Access forbidden');
          break;
        case 404:
          // Not found - show error message
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('An error occurred:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;