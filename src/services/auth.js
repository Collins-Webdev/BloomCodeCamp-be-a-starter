import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export async function login(username, password) {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', response.headers.authorization);
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}