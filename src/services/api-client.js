import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  const headers = {
    'x-app-key': process.env.REACT_APP_API_KEY,
    'x-app-id': process.env.REACT_APP_ID,
    'x-remote-user-id': 0,
  };

  return { ...config, headers };
}, (error) => Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use((response) => response,
  (error) => Promise.reject(error));

export default axios;
