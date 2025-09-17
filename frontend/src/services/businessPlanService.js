import api from './api';

export default {
  getBusinessPlans: async () => {
    const response = await api.get('/business-plans');
    return response.data;
  },

  getBusinessPlan: async (planId) => {
    const response = await api.get(`/business-plans/${planId}`);
    return response.data;
  },

  createBusinessPlan: async (planData) => {
    const response = await api.post('/business-plans', planData);
    return response.data;
  },

  updateSection: async (planId, section, data) => {
    const response = await api.put(`/business-plans/${planId}/${section}`, data);
    return response.data;
  }
};
