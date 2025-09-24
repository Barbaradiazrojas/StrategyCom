// frontend/src/pages/app/strategic/ValueChain.jsx
import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Edit3, 
  Plus, 
  Trash2, 
  Info, 
  TrendingUp, 
  Award,
  FileText,
  Download
} from 'lucide-react';
import './ValueChain.css';
import { useBusinessPlan } from '../../../hooks/useBusinessPlan';

const ValueChain = () => {
  const { businessPlan, updateBusinessPlan } = useBusinessPlan();
  const [valueChainData, setValueChainData] = useState({
    primaryActivities: {
      logisticaEntrada: {
        title: 'Logística de Entrada',
        description: 'Actividades relacionadas con la recepción, almacenamiento y distribución interna de materias primas',
        items: [],
        costs: 0,
        value: 0
      },
      operaciones: {
        title: 'Operaciones',
        description: 'Actividades de transformación de materias primas en productos finales',
        items: [],
        costs: 0,
        value: 0
      },
      logisticaSalida: {
        title: 'Logística de Salida',
        description: 'Actividades de almacenamiento y distribución del producto final',
        items: [],
        costs: 0,
        value: 0
      },
      marketingVentas: {
        title: 'Marketing y Ventas',
        description: 'Actividades para dar a conocer el producto y generar ventas',
        items: [],
        costs: 0,
        value: 0
      },
      servicios: {
        title: 'Servicios',
        description: 'Actividades que mantienen o realzan el valor del producto',
        items: [],
        costs: 0,
        value: 0
      }
    },
    supportActivities: {
      infraestructura: {
        title: 'Infraestructura',
        description: 'Sistemas de planificación, finanzas, contabilidad, legal, gobierno corporativo',
        items: [],
        costs: 0,
        value: 0
      },
      gestionRRHH: {
        title: 'Gestión de RRHH',
        description: 'Actividades de reclutamiento, contratación, capacitación y desarrollo del personal',
        items: [],
        costs: 0,
        value: 0
      },
      desarrolloTecnologia: {
        title: 'Desarrollo de Tecnología',
        description: 'Actividades de I+D, automatización, mejora de procesos y tecnología',
        items: [],
        costs: 0,
        value: 0
      },
      gestionCompras: {
        title: 'Gestión de Compras',
        description: 'Adquisición de materias primas, suministros y otros recursos',
        items: [],
        costs: 0,
        value: 0
      }
    },
    margin: 0,
    totalCosts: 0,
    totalValue: 0,
    analysis: {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      recommendations: []
    }
  });

  const [editingActivity, setEditingActivity] = useState(null);
  const [newItem, setNewItem] = useState({ description: '', cost: 0, value: 0 });
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar datos del plan de negocio
  useEffect(() => {
    if (businessPlan?.strategic?.valueChain) {
      setValueChainData(businessPlan.strategic.valueChain);
    }
  }, [businessPlan]);

  // Calcular totales automáticamente
  useEffect(() => {
    calculateTotals();
  }, [valueChainData.primaryActivities, valueChainData.supportActivities]);

  const calculateTotals = () => {
    let totalCosts = 0;
    let totalValue = 0;

    // Sumar actividades primarias
    Object.values(valueChainData.primaryActivities).forEach(activity => {
      totalCosts += activity.costs || 0;
      totalValue += activity.value || 0;
    });

    // Sumar actividades de soporte
    Object.values(valueChainData.supportActivities).forEach(activity => {
      totalCosts += activity.costs || 0;
      totalValue += activity.value || 0;
    });

    const margin = totalValue - totalCosts;

    setValueChainData(prev => ({
      ...prev,
      totalCosts,
      totalValue,
      margin
    }));
  };

  const addItemToActivity = (activityType, activityKey) => {
    if (!newItem.description.trim()) return;

    setValueChainData(prev => {
      const updatedData = { ...prev };
      const activity = updatedData[activityType][activityKey];
      
      activity.items.push({
        id: Date.now(),
        description: newItem.description,
        cost: parseFloat(newItem.cost) || 0,
        value: parseFloat(newItem.value) || 0
      });

      // Recalcular costos y valor de la actividad
      activity.costs = activity.items.reduce((sum, item) => sum + item.cost, 0);
      activity.value = activity.items.reduce((sum, item) => sum + item.value, 0);

      return updatedData;
    });

    setNewItem({ description: '', cost: 0, value: 0 });
    setEditingActivity(null);
  };

  const removeItemFromActivity = (activityType, activityKey, itemId) => {
    setValueChainData(prev => {
      const updatedData = { ...prev };
      const activity = updatedData[activityType][activityKey];
      
      activity.items = activity.items.filter(item => item.id !== itemId);
      
      // Recalcular costos y valor de la actividad
      activity.costs = activity.items.reduce((sum, item) => sum + item.cost, 0);
      activity.value = activity.items.reduce((sum, item) => sum + item.value, 0);

      return updatedData;
    });
  };

  const saveValueChain = async () => {
    setLoading(true);
    try {
      await updateBusinessPlan({
        strategic: {
          ...businessPlan.strategic,
          valueChain: valueChainData
        }
      });
      alert('Cadena de Valor guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la Cadena de Valor');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    // Función para generar reporte PDF (integración con backend)
    console.log('Generando reporte de Cadena de Valor...');
  };

  const renderActivity = (activity, activityKey, activityType, isSupport = false) => {
    const isEditing = editingActivity === `${activityType}-${activityKey}`;
    
    return (
      <div 
        key={activityKey}
        className={`value-chain-activity ${isSupport ? 'support-activity' : 'primary-activity'}`}
      >
        <div className="activity-header">
          <h3>{activity.title}</h3>
          <div className="activity-actions">
            <button
              className="btn-icon"
              onClick={() => setEditingActivity(isEditing ? null : `${activityType}-${activityKey}`)}
            >
              <Edit3 size={16} />
            </button>
            <div className="activity-info">
              <Info size={16} />
              <div className="tooltip">{activity.description}</div>
            </div>
          </div>
        </div>

        <div className="activity-content">
          <div className="activity-items">
            {activity.items.map(item => (
              <div key={item.id} className="activity-item">
                <span className="item-description">{item.description}</span>
                <div className="item-values">
                  <span className="item-cost">-${item.cost.toLocaleString()}</span>
                  <span className="item-value">+${item.value.toLocaleString()}</span>
                  <button 
                    className="btn-remove"
                    onClick={() => removeItemFromActivity(activityType, activityKey, item.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="add-item-form">
              <input
                type="text"
                placeholder="Descripción de la actividad..."
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                className="form-input"
              />
              <div className="item-inputs">
                <input
                  type="number"
                  placeholder="Costo"
                  value={newItem.cost}
                  onChange={(e) => setNewItem(prev => ({ ...prev, cost: e.target.value }))}
                  className="form-input small"
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={newItem.value}
                  onChange={(e) => setNewItem(prev => ({ ...prev, value: e.target.value }))}
                  className="form-input small"
                />
                <button 
                  className="btn-add"
                  onClick={() => addItemToActivity(activityType, activityKey)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="activity-summary">
            <div className="summary-item">
              <span>Costos Total:</span>
              <span className="cost-value">-${activity.costs.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Valor Total:</span>
              <span className="value-value">+${activity.value.toLocaleString()}</span>
            </div>
            <div className="summary-item margin-item">
              <span>Margen:</span>
              <span className={`margin-value ${(activity.value - activity.costs) >= 0 ? 'positive' : 'negative'}`}>
                ${(activity.value - activity.costs).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="value-chain-container">
      <div className="page-header">
        <div className="header-content">
          <h1>Cadena de Valor</h1>
          <p>Analiza las actividades de tu empresa para identificar ventajas competitivas</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => setShowAnalysis(!showAnalysis)}
          >
            <TrendingUp size={20} />
            Análisis
          </button>
          <button 
            className="btn-secondary"
            onClick={generateReport}
          >
            <Download size={20} />
            Exportar
          </button>
          <button 
            className="btn-primary"
            onClick={saveValueChain}
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      <div className="value-chain-diagram">
        {/* Actividades de Soporte */}
        <div className="support-activities-section">
          <div className="section-title">
            <h2>Actividades de Soporte</h2>
          </div>
          <div className="support-activities-grid">
            {Object.entries(valueChainData.supportActivities).map(([key, activity]) => 
              renderActivity(activity, key, 'supportActivities', true)
            )}
          </div>
          <div className="margin-indicator">
            <span>MARGEN</span>
          </div>
        </div>

        {/* Actividades Primarias */}
        <div className="primary-activities-section">
          <div className="section-title">
            <h2>Actividades Primarias</h2>
          </div>
          <div className="primary-activities-grid">
            {Object.entries(valueChainData.primaryActivities).map(([key, activity]) => 
              renderActivity(activity, key, 'primaryActivities')
            )}
          </div>
          <div className="margin-indicator">
            <span>MARGEN</span>
          </div>
        </div>
      </div>

      {/* Resumen Financiero */}
      <div className="financial-summary">
        <div className="summary-card">
          <h3>Resumen Financiero</h3>
          <div className="summary-metrics">
            <div className="metric">
              <span className="metric-label">Costos Totales:</span>
              <span className="metric-value cost">-${valueChainData.totalCosts.toLocaleString()}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Valor Totales:</span>
              <span className="metric-value value">+${valueChainData.totalValue.toLocaleString()}</span>
            </div>
            <div className="metric main-metric">
              <span className="metric-label">Margen Total:</span>
              <span className={`metric-value ${valueChainData.margin >= 0 ? 'positive' : 'negative'}`}>
                ${valueChainData.margin.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de Análisis */}
      {showAnalysis && (
        <div className="analysis-panel">
          <div className="analysis-header">
            <h3>Análisis Estratégico</h3>
            <button 
              className="btn-close"
              onClick={() => setShowAnalysis(false)}
            >
              ×
            </button>
          </div>
          <div className="analysis-content">
            <div className="analysis-section">
              <h4><Award size={18} /> Fortalezas Identificadas</h4>
              <ul>
                {Object.entries(valueChainData.primaryActivities)
                  .filter(([_, activity]) => (activity.value - activity.costs) > 0)
                  .map(([key, activity]) => (
                    <li key={key}>
                      <strong>{activity.title}:</strong> Genera un margen positivo de 
                      ${(activity.value - activity.costs).toLocaleString()}
                    </li>
                  ))
                }
              </ul>
            </div>
            
            <div className="analysis-section">
              <h4><FileText size={18} /> Oportunidades de Mejora</h4>
              <ul>
                {Object.entries(valueChainData.primaryActivities)
                  .filter(([_, activity]) => (activity.value - activity.costs) <= 0)
                  .map(([key, activity]) => (
                    <li key={key}>
                      <strong>{activity.title}:</strong> Requiere optimización 
                      (margen: ${(activity.value - activity.costs).toLocaleString()})
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueChain;