import axios from 'axios';
const baseUrl = '/api/login';

const login = (credentials) => {
  const { username, password } = credentials;
  return axios.post(baseUrl, { username, password });
};

export default { login };
