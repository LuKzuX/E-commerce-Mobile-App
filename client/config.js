// API URL configuration
const API_URL = 'https://your-production-domain.com'; // Replace with your actual production domain

export const getApiUrl = () => {
  return API_URL || 'http://10.0.0.160:5000'; // fallback to local IP for development
}; 