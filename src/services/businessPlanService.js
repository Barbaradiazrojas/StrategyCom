// frontend/src/services/businessPlanService.js
import api from './api';

// Existing business plan functions...
export const businessPlanService = {
  // Existing methods would be here...
  
  // Business Plan CRUD
  async getBusinessPlans() {
    try {
      const response = await api.get('/business-plans');
      return response.data;
    } catch (error) {
      console.error('Error getting business plans:', error);
      throw error;
    }
  },

  async getBusinessPlan(id) {
    try {
      const response = await api.get(`/business-plans/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting business plan:', error);
      throw error;
    }
  },

  async createBusinessPlan(data) {
    try {
      const response = await api.post('/business-plans', data);
      return response.data;
    } catch (error) {
      console.error('Error creating business plan:', error);
      throw error;
    }
  },

  async updateBusinessPlan(id, data) {
    try {
      const response = await api.put(`/business-plans/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating business plan:', error);
      throw error;
    }
  },

  async deleteBusinessPlan(id) {
    try {
      const response = await api.delete(`/business-plans/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting business plan:', error);
      throw error;
    }
  }
};

// Strategic Analysis Service
export const strategicService = {
  // Problem Analysis
  async getProblemAnalysis(businessPlanId) {
    try {
      const response = await api.get(`/strategic/problem-analysis/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting problem analysis:', error);
      throw error;
    }
  },

  async saveProblemAnalysis(data) {
    try {
      const response = await api.post('/strategic/problem-analysis', data);
      return response.data;
    } catch (error) {
      console.error('Error saving problem analysis:', error);
      throw error;
    }
  },

  async updateProblemAnalysis(id, data) {
    try {
      const response = await api.put(`/strategic/problem-analysis/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating problem analysis:', error);
      throw error;
    }
  },

  // Canvas Method
  async getCanvasMethod(businessPlanId) {
    try {
      const response = await api.get(`/strategic/canvas-method/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting canvas method:', error);
      throw error;
    }
  },

  async saveCanvasMethod(data) {
    try {
      const response = await api.post('/strategic/canvas-method', data);
      return response.data;
    } catch (error) {
      console.error('Error saving canvas method:', error);
      throw error;
    }
  },

  // PESTEL Analysis
  async getPestelAnalysis(businessPlanId) {
    try {
      const response = await api.get(`/strategic/pestel-analysis/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting PESTEL analysis:', error);
      throw error;
    }
  },

  async savePestelAnalysis(data) {
    try {
      const response = await api.post('/strategic/pestel-analysis', data);
      return response.data;
    } catch (error) {
      console.error('Error saving PESTEL analysis:', error);
      throw error;
    }
  },

  // Porter Forces
  async getPorterForces(businessPlanId) {
    try {
      const response = await api.get(`/strategic/porter-forces/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting Porter forces:', error);
      throw error;
    }
  },

  async savePorterForces(data) {
    try {
      const response = await api.post('/strategic/porter-forces', data);
      return response.data;
    } catch (error) {
      console.error('Error saving Porter forces:', error);
      throw error;
    }
  },

  // Benchmarking
  async getBenchmarking(businessPlanId) {
    try {
      const response = await api.get(`/strategic/benchmarking/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting benchmarking:', error);
      throw error;
    }
  },

  async saveBenchmarking(data) {
    try {
      const response = await api.post('/strategic/benchmarking', data);
      return response.data;
    } catch (error) {
      console.error('Error saving benchmarking:', error);
      throw error;
    }
  },

  // Value Chain
  async getValueChain(businessPlanId) {
    try {
      const response = await api.get(`/strategic/value-chain/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting value chain:', error);
      throw error;
    }
  },

  async saveValueChain(data) {
    try {
      const response = await api.post('/strategic/value-chain', data);
      return response.data;
    } catch (error) {
      console.error('Error saving value chain:', error);
      throw error;
    }
  },

  // SWOT Analysis
  async getSwotAnalysis(businessPlanId) {
    try {
      const response = await api.get(`/strategic/swot-analysis/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting SWOT analysis:', error);
      throw error;
    }
  },

  async saveSwotAnalysis(data) {
    try {
      const response = await api.post('/strategic/swot-analysis', data);
      return response.data;
    } catch (error) {
      console.error('Error saving SWOT analysis:', error);
      throw error;
    }
  },

  // Critical Factors
  async getCriticalFactors(businessPlanId) {
    try {
      const response = await api.get(`/strategic/critical-factors/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting critical factors:', error);
      throw error;
    }
  },

  async saveCriticalFactors(data) {
    try {
      const response = await api.post('/strategic/critical-factors', data);
      return response.data;
    } catch (error) {
      console.error('Error saving critical factors:', error);
      throw error;
    }
  },

  // Competitive Advantage
  async getCompetitiveAdvantage(businessPlanId) {
    try {
      const response = await api.get(`/strategic/competitive-advantage/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting competitive advantage:', error);
      throw error;
    }
  },

  async saveCompetitiveAdvantage(data) {
    try {
      const response = await api.post('/strategic/competitive-advantage', data);
      return response.data;
    } catch (error) {
      console.error('Error saving competitive advantage:', error);
      throw error;
    }
  },

  // Generic methods for other strategic analysis tools
  async getStrategicData(analysisType, businessPlanId) {
    try {
      const response = await api.get(`/strategic/${analysisType}/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting ${analysisType}:`, error);
      throw error;
    }
  },

  async saveStrategicData(analysisType, data) {
    try {
      const response = await api.post(`/strategic/${analysisType}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error saving ${analysisType}:`, error);
      throw error;
    }
  },

  // Get all strategic analysis progress for a business plan
  async getStrategicProgress(businessPlanId) {
    try {
      const response = await api.get(`/strategic/progress/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting strategic progress:', error);
      throw error;
    }
  },

  // Export strategic data
  async exportStrategicData(businessPlanId) {
    try {
      const response = await api.get(`/strategic/export/${businessPlanId}`);
      return response.data;
    } catch (error) {
      console.error('Error exporting strategic data:', error);
      throw error;
    }
  },

  // Import strategic data
  async importStrategicData(businessPlanId, data) {
    try {
      const response = await api.post(`/strategic/import/${businessPlanId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error importing strategic data:', error);
      throw error;
    }
  }
};