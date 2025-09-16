import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const getBusinessPlanData = async () => {
  const response = await api.get('/business-plan');
  return response.data;
};

export const saveCanvasData = async (data) => {
  const response = await api.post('/business-plan/canvas', data);
  return response.data;
};
