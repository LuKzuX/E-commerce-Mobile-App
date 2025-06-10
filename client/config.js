// API URL configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://material-delivery.vercel.app'  // Your Vercel deployment URL
  : 'http://10.0.0.160:5000'; // local development URL

export const getApiUrl = () => {
  return API_URL;
}; 