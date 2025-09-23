// frontend/src/hooks/useBusinessPlan.js
import { useState, useEffect, useCallback } from 'react';
import { businessPlanService } from '../services/businessPlanService';
import { useAuth } from './useAuth';

export const useBusinessPlan = () => {
  const [businessPlan, setBusinessPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Cargar plan de negocio
  const fetchBusinessPlan = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const response = await businessPlanService.getBusinessPlan(user.id);
      setBusinessPlan(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching business plan:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Crear nuevo plan de negocio
  const createBusinessPlan = useCallback(async (planData) => {
    try {
      const response = await businessPlanService.createBusinessPlan({
        ...planData,
        userId: user?.id
      });
      setBusinessPlan(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [user?.id]);

  // Actualizar plan de negocio
  const updateBusinessPlan = useCallback(async (updates) => {
    if (!businessPlan?.id) return;

    try {
      const response = await businessPlanService.updateBusinessPlan(businessPlan.id, updates);
      setBusinessPlan(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [businessPlan?.id]);

  // Actualizar sección específica
  const updateSection = useCallback(async (section, data) => {
    if (!businessPlan?.id) return;

    try {
      let response;
      switch (section) {
        case 'strategic':
          response = await businessPlanService.updateStrategicAnalysis(businessPlan.id, data);
          break;
        case 'marketing':
          response = await businessPlanService.updateMarketingPlan(businessPlan.id, data);
          break;
        case 'financial':
          response = await businessPlanService.updateFinancialPlan(businessPlan.id, data);
          break;
        default:
          throw new Error('Sección no válida');
      }

      setBusinessPlan(prev => ({
        ...prev,
        [section]: response.data
      }));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [businessPlan?.id]);

  // Generar reporte
  const generateReport = useCallback(async (format = 'pdf') => {
    if (!businessPlan?.id) return;

    try {
      const response = await businessPlanService.generateReport(businessPlan.id, format);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [businessPlan?.id]);

  // Obtener plantillas
  const getTemplates = useCallback(async () => {
    try {
      const response = await businessPlanService.getTemplates();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Crear desde plantilla
  const createFromTemplate = useCallback(async (templateId, planData) => {
    try {
      const response = await businessPlanService.createFromTemplate(templateId, {
        ...planData,
        userId: user?.id
      });
      setBusinessPlan(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [user?.id]);

  // Limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cargar datos al montar o cuando cambie el usuario
  useEffect(() => {
    if (user?.id) {
      fetchBusinessPlan();
    }
  }, [user?.id, fetchBusinessPlan]);

  return {
    // Estado
    businessPlan,
    loading,
    error,
    
    // Acciones
    fetchBusinessPlan,
    createBusinessPlan,
    updateBusinessPlan,
    updateSection,
    generateReport,
    getTemplates,
    createFromTemplate,
    clearError,

    // Getters útiles
    hasStrategicAnalysis: businessPlan?.strategic ? true : false,
    hasMarketingPlan: businessPlan?.marketing ? true : false,
    hasFinancialPlan: businessPlan?.financial ? true : false,
    completionPercentage: businessPlan ? calculateCompletionPercentage(businessPlan) : 0
  };
};

// Función auxiliar para calcular porcentaje de completitud
function calculateCompletionPercentage(plan) {
  const sections = ['strategic', 'marketing', 'financial', 'hr', 'operations'];
  const completedSections = sections.filter(section => plan[section] && Object.keys(plan[section]).length > 0);
  return Math.round((completedSections.length / sections.length) * 100);
}
