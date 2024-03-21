import axios from 'axios';


const username = 'ice_api';
const password = 'ice_api';

// Encode the username and password in base64 format
const basicAuth = btoa(`${username}:${password}`);


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for setting up common headers or tokens
api.interceptors.request.use(
  (config: any) => {
    // Add basic authentication header
    config.headers.Authorization = `Basic ${basicAuth}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global error responses
api.interceptors.response.use(
  (response: any) => {
    // Handle successful responses here
    return response;
  },
  (error: any) => {
    // Handle error responses globally
    if (error.response) {
      // Handle HTTP error responses (e.g., 401 Unauthorized)
      console.error('HTTP Error:', error.response.status);
    } else if (error.request) {
      // Handle network request error (e.g., no response)
      console.error('Network Error:', error.request);
    } else {
      // Handle other errors
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
