// src/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8081', // Replace with your API URL
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

// Define a flag to prevent multiple token refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Function to add a subscriber to be notified when the token is refreshed
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// Function to notify all subscribers when the token is refreshed
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}

// Function to request a new token
async function refreshToken() {
  // This is your refresh token API endpoint. Adjust it as needed.
  const refreshToken = localStorage.getItem('refreshToken');
  
  // Create a separate axios instance for the refresh token call
  const response = await axios.get('127.0.0.1:8081/api/auth/refresh', {
    headers: {
        'Authorization': `Bearer ${refreshToken}`
    },
});

  const { accessToken } = response.data.accessToken;
  
  // Store the new token in localStorage (or wherever you're storing tokens)
  localStorage.setItem('accessToken', accessToken);

  // Return the new token
  return accessToken;
}

// Request interceptor to add the token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401, try to refresh the token
    if (error.response && error.response.status === 401) {
      
      // Prevent multiple refresh attempts
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Refresh the token
          const newToken = await refreshToken();
          
          // Notify all subscribers with the new token
          onRrefreshed(newToken);
          
          // Reset the refresh state
          isRefreshing = false;
          refreshSubscribers = [];
          
        } catch (refreshError) {
          // If refresh fails, log out or redirect to login page
          isRefreshing = false;
          refreshSubscribers = [];
          window.location = '/';
          return Promise.reject(refreshError);
        }
      }

      // Create a promise to retry the original request once the token is refreshed
      const retryOriginalRequest = new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          // Update the Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
