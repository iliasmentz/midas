import axios from 'axios';

const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';

const client = axios.create({
  baseURL: APP_BASE_URL,
  headers: {
    ContentType: 'application/json',
  },
});

export default client;
