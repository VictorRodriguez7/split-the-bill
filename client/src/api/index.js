import axios from 'axios';

const api = axios.create({
  baseURL: 'https://split-the-bill-ckrx.onrender.com',
});

export default api;
