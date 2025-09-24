import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import businessPlanService from '../services/businessPlanService';

const BusinessPlanContext = createContext();

export function BusinessPlanProvider({ children }) {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [plansList, setPlansList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPlan = async (planId) => {
    setLoading(true);
    try {
      const plan = await businessPlanService.getBusinessPlan(planId);
      setCurrentPlan(plan);
    } catch (error) {
      toast.error("Error al cargar el plan de negocio");
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (planId, section, data) => {
    try {
      const updatedPlan = await businessPlanService.updateSection(planId, section, data);
      setCurrentPlan(prev => ({ ...prev, ...updatedPlan }));
      toast.success("Cambios guardados exitosamente");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Error al actualizar");
      return { success: false, error: error.message };
    }
  };

  const createNewPlan = async (planData) => {
    try {
      const newPlan = await businessPlanService.createBusinessPlan(planData);
      setCurrentPlan(newPlan);
      setPlansList(prev => [...prev, newPlan]);
      toast.success("Nuevo plan de negocio creado");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Error al crear plan");
      return { success: false, error: error.message };
    }
  };

  return (
    <BusinessPlanContext.Provider value={{
      currentPlan,
      plansList,
      loading,
      loadPlan,
      updatePlan,
      createNewPlan,
      setCurrentPlan
    }}>
      {children}
    </BusinessPlanContext.Provider>
  );
}

export function useBusinessPlan() {
  return useContext(BusinessPlanContext);
}
