import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export async function getAssignments() {
  const response = await api.get('/assignments');
  return response.data;
}

export async function getAssignment(id) {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
}

export async function updateAssignment(id, assignment) {
  const response = await api.put(`/assignments/${id}`, assignment);
  return response.data;
}