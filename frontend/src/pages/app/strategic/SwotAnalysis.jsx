// frontend/src/pages/app/strategic/SwotAnalysis.jsx
import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  Target,
  Shield,
  AlertTriangle,
  Star,
  Import,
  BarChart3,
  Download,
  RefreshCw,
  Info
} from 'lucide-react';
import './SwotAnalysis.css';
import { useBusinessPlan } from '../../../hooks/useBusinessPlan';

const SwotAnalysis = () => {
  const { businessPlan, updateBusinessPlan } = useBusinessPlan();
  
  const [swotData, setSwotData] = useState({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
    analysis: {
      strengthsAvg: { evidence: 0, impact: 0, weighted: 0 },
      weaknessesAvg: { evidence: 0, impact: 0, weighted: 0 },
      opportunitiesAvg: { evidence: 0, impact: 0, weighted: 0 },
      threatsAvg: { evidence: 0, impact: 0, weighted: 0 }
    },
    strategies: {
      fo: [], // Fortalezas-Oportunidades
      fa: [], // Fortalezas-Amenazas
      do: [], // Debilidades-Oportunidades
      da: []  // Debilidades-Amenazas
    },
    lastUpdated: null
  });

  const [activeQuadrant, setActiveQuadrant] = useState('strengths');
  const [newItem, setNewItem] = useState({ description: '', evidence: 0, impact: 0 });
  const [showStrategies, setShowStrategies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importData, setImportData] = useState({ valueChain: false, pestel: false, porter: false });

  // Cargar datos del plan de negocio
  useEffect(() => {
    if (businessPlan?.strategic?.swotAnalysis) {
      setSwotData(businessPlan.strategic.swotAnalysis);
    }
  }, [businessPlan]);

  // Calcular promedios automáticamente
  useEffect(() => {
    calculateAverages();
  }, [swotData.strengths, swotData.weaknesses, swotData.opportunities, swotData.threats]);

  const calculateAverages = () => {
    const calculateQuadrantAvg = (items) => {
      if (items.length === 0) return { evidence: 0, impact: 0, weighted: 0 };
      
      const evidenceSum = items.reduce((sum, item) => sum + (item.evidence || 0), 0);
      const impactSum = items.reduce((sum, item) => sum + (item.impact || 0), 0);
      const evidenceAvg = evidenceSum / items.length;
      const impactAvg = impactSum / items.length;
      
      return {
        evidence: Number(evidenceAvg.toFixed(1)),
        impact: Number(impactAvg.toFixed(1)),
        weighted: Number((evidenceAvg * impactAvg).toFixed(1))
      };
    };

    setSwotData(prev => ({
      ...prev,
      analysis: {
        strengthsAvg: calculateQuadrantAvg(prev.strengths),
        weaknessesAvg: calculateQuadrantAvg(prev.weaknesses),
        opportunitiesAvg: calculateQuadrantAvg(prev.opportunities),
        threatsAvg: calculateQuadrantAvg(prev.threats)
      }
    }));
  };

  // Importar datos de ValueChain (para Fortalezas y Debilidades)
  const importFromValueChain = () => {
    const valueChainData = businessPlan?.strategic?.valueChain;
    if (!valueChainData) {
      alert('Primero debes completar la Cadena de Valor');
      return;
    }

    const newStrengths = [];
    const newWeaknesses = [];

    // Analizar actividades con margen positivo como fortalezas
    Object.entries(valueChainData.primaryActivities).forEach(([key, activity]) => {
      const margin = activity.value - activity.costs;
      if (margin > 0) {
        newStrengths.push({
          id: Date.now() + Math.random(),
          description: `${activity.title}: Genera margen positivo de $${margin.toLocaleString()}`,
          evidence: Math.min(7, Math.ceil(margin / 10000)), // Escalar según margen
          impact: 6,
          source: 'ValueChain'
        });
      } else {
        newWeaknesses.push({
          id: Date.now() + Math.random(),
          description: `${activity.title}: Margen negativo de $${Math.abs(margin).toLocaleString()}`,
          evidence: Math.min(7, Math.ceil(Math.abs(margin) / 10000)),
          impact: 5,
          source: 'ValueChain'
        });
      }
    });

    // Analizar actividades de soporte
    Object.entries(valueChainData.supportActivities).forEach(([key, activity]) => {
      const margin = activity.value - activity.costs;
      if (margin > 0) {
        newStrengths.push({
          id: Date.now() + Math.random(),
          description: `${activity.title}: Soporte eficiente con margen de $${margin.toLocaleString()}`,
          evidence: Math.min(7, Math.ceil(margin / 5000)),
          impact: 4,
          source: 'ValueChain'
        });
      }
    });

    setSwotData(prev => ({
      ...prev,
      strengths: [...prev.strengths.filter(s => s.source !== 'ValueChain'), ...newStrengths],
      weaknesses: [...prev.weaknesses.filter(w => w.source !== 'ValueChain'), ...newWeaknesses]
    }));

    setImportData(prev => ({ ...prev, valueChain: true }));
  };

  // Importar datos de PESTEL (para Oportunidades y Amenazas)
  const importFromPestel = () => {
    const pestelData = businessPlan?.strategic?.pestelAnalysis;
    if (!pestelData) {
      alert('Primero debes completar el Análisis PESTEL');
      return;
    }

    const newOpportunities = [];
    const newThreats = [];

    Object.entries(pestelData.factors).forEach(([category, factors]) => {
      factors.forEach(factor => {
        if (factor.impact > 0 && factor.probability > 3) {
          newOpportunities.push({
            id: Date.now() + Math.random(),
            description: `${category.toUpperCase()}: ${factor.description}`,
            evidence: factor.probability,
            impact: factor.impact,
            source: 'PESTEL'
          });
        } else if (factor.impact < 0 && factor.probability > 3) {
          newThreats.push({
            id: Date.now() + Math.random(),
            description: `${category.toUpperCase()}: ${factor.description}`,
            evidence: factor.probability,
            impact: Math.abs(factor.impact),
            source: 'PESTEL'
          });
        }
      });
    });

    setSwotData(prev => ({
      ...prev,
      opportunities: [...prev.opportunities.filter(o => o.source !== 'PESTEL'), ...newOpportunities],
      threats: [...prev.threats.filter(t => t.source !== 'PESTEL'), ...newThreats]
    }));

    setImportData(prev => ({ ...prev, pestel: true }));
  };

  // Importar datos de Porter (para Oportunidades y Amenazas)
  const importFromPorter = () => {
    const porterData = businessPlan?.strategic?.porterForces;
    if (!porterData) {
      alert('Primero debes completar el Análisis de las 5 Fuerzas de Porter');
      return;
    }

    const newOpportunities = [];
    const newThreats = [];

    Object.entries(porterData.forces).forEach(([force, data]) => {
      if (data.intensity <= 3) { // Intensidad baja = oportunidad
        newOpportunities.push({
          id: Date.now() + Math.random(),
          description: `${force}: Baja intensidad competitiva permite aprovechar el mercado`,
          evidence: 7 - data.intensity,
          impact: 6,
          source: 'Porter'
        });
      } else if (data.intensity >= 5) { // Intensidad alta = amenaza
        newThreats.push({
          id: Date.now() + Math.random(),
          description: `${force}: Alta intensidad competitiva representa una amenaza`,
          evidence: data.intensity,
          impact: 6,
          source: 'Porter'
        });
      }
    });

    setSwotData(prev => ({
      ...prev,
      opportunities: [...prev.opportunities.filter(o => o.source !== 'Porter'), ...newOpportunities],
      threats: [...prev.threats.filter(t => t.source !== 'Porter'), ...newThreats]
    }));

    setImportData(prev => ({ ...prev, porter: true }));
  };

  const addItem = () => {
    if (!newItem.description.trim()) return;

    const item = {
      id: Date.now(),
      description: newItem.description,
      evidence: parseInt(newItem.evidence) || 0,
      impact: parseInt(newItem.impact) || 0,
      source: 'Manual'
    };

    setSwotData(prev => ({
      ...prev,
      [activeQuadrant]: [...prev[activeQuadrant], item]
    }));

    setNewItem({ description: '', evidence: 0, impact: 0 });
  };

  const removeItem = (quadrant, itemId) => {
    setSwotData(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].filter(item => item.id !== itemId)
    }));
  };

  const generateStrategies = () => {
    const strategies = {
      fo: [], // Estrategias FO (Fortalezas-Oportunidades)
      fa: [], // Estrategias FA (Fortalezas-Amenazas)
      do: [], // Estrategias DO (Debilidades-Oportunidades)
      da: []  // Estrategias DA (Debilidades-Amenazas)
    };

    // Generar estrategias automáticamente basadas en combinaciones
    swotData.strengths.forEach(strength => {
      swotData.opportunities.forEach(opportunity => {
        if (strength.impact >= 5 && opportunity.impact >= 5) {
          strategies.fo.push({
            id: `fo-${strength.id}-${opportunity.id}`,
            description: `Usar "${strength.description}" para aprovechar "${opportunity.description}"`,
            priority: Math.ceil((strength.impact + opportunity.impact) / 2)
          });
        }
      });
    });

    swotData.strengths.forEach(strength => {
      swotData.threats.forEach(threat => {
        if (strength.impact >= 5 && threat.impact >= 5) {
          strategies.fa.push({
            id: `fa-${strength.id}-${threat.id}`,
            description: `Usar "${strength.description}" para mitigar "${threat.description}"`,
            priority: Math.ceil((strength.impact + threat.impact) / 2)
          });
        }
      });
    });

    setSwotData(prev => ({
      ...prev,
      strategies: strategies
    }));

    setShowStrategies(true);
  };

  const saveSwotAnalysis = async () => {
    setLoading(true);
    try {
      await updateBusinessPlan({
        strategic: {
          ...businessPlan.strategic,
          swotAnalysis: {
            ...swotData,
            lastUpdated: new Date().toISOString()
          }
        }
      });
      alert('Análisis SWOT guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el Análisis SWOT');
    } finally {
      setLoading(false);
    }
  };

  const quadrants = [
    {
      key: 'strengths',
      title: 'Fortalezas',
      subtitle: 'Factores internos positivos',
      icon: Star,
      color: 'green',
      description: 'Datos importados desde la Cadena de Valor'
    },
    {
      key: 'weaknesses',
      title: 'Debilidades',
      subtitle: 'Factores internos negativos',
      icon: AlertTriangle,
      color: 'yellow',
      description: 'Datos importados desde la Cadena de Valor'
    },
    {
      key: 'opportunities',
      title: 'Oportunidades',
      subtitle: 'Factores externos positivos',
      icon: TrendingUp,
      color: 'blue',
      description: 'Datos importados desde PESTEL y Porter'
    },
    {
      key: 'threats',
      title: 'Amenazas',
      subtitle: 'Factores externos negativos',
      icon: TrendingDown,
      color: 'red',
      description: 'Datos importados desde PESTEL y Porter'
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      green: 'swot-green',
      yellow: 'swot-yellow',
      blue: 'swot-blue',
      red: 'swot-red'
    };
    return colors[color] || 'swot-gray';
  };

  return (
    <div className="swot-analysis-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Análisis SWOT/FODA</h1>
          <p>Fortalezas, Oportunidades, Debilidades y Amenazas</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => setShowStrategies(!showStrategies)}
          >
            <Target size={20} />
            Estrategias
          </button>
          <button 
            className="btn-secondary"
            onClick={generateStrategies}
          >
            <BarChart3 size={20} />
            Generar
          </button>
          <button 
            className="btn-primary"
            onClick={saveSwotAnalysis}
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Panel de Importación */}
      <div className="import-panel">
        <div className="import-header">
          <h3><Import size={20} />Importar Datos de Otros Análisis</h3>
          <p>Conecta automáticamente con tus análisis previos</p>
        </div>
        <div className="import-buttons">
          <button 
            className={`import-btn ${importData.valueChain ? 'imported' : ''}`}
            onClick={importFromValueChain}
          >
            <Shield size={16} />
            Cadena de Valor
            <span className="import-desc">→ Fortalezas & Debilidades</span>
          </button>
          <button 
            className={`import-btn ${importData.pestel ? 'imported' : ''}`}
            onClick={importFromPestel}
          >
            <TrendingUp size={16} />
            PESTEL
            <span className="import-desc">→ Oportunidades & Amenazas</span>
          </button>
          <button 
            className={`import-btn ${importData.porter ? 'imported' : ''}`}
            onClick={importFromPorter}
          >
            <TrendingDown size={16} />
            Porter
            <span className="import-desc">→ Oportunidades & Amenazas</span>
          </button>
        </div>
      </div>

      {/* Matriz SWOT */}
      <div className="swot-matrix">
        {quadrants.map((quadrant) => {
          const IconComponent = quadrant.icon;
          const items = swotData[quadrant.key] || [];
          const avg = swotData.analysis[`${quadrant.key}Avg`] || { evidence: 0, impact: 0, weighted: 0 };
          
          return (
            <div 
              key={quadrant.key}
              className={`swot-quadrant ${getColorClass(quadrant.color)} ${activeQuadrant === quadrant.key ? 'active' : ''}`}
              onClick={() => setActiveQuadrant(quadrant.key)}
            >
              <div className="quadrant-header">
                <div className="quadrant-title">
                  <IconComponent size={24} />
                  <div>
                    <h3>{quadrant.title}</h3>
                    <p>{quadrant.subtitle}</p>
                  </div>
                </div>
                <div className="quadrant-metrics">
                  <span className="metric">Ev: {avg.evidence}</span>
                  <span className="metric">Im: {avg.impact}</span>
                  <span className="metric weighted">P: {avg.weighted}</span>
                </div>
              </div>

              <div className="quadrant-description">
                <Info size={14} />
                <span>{quadrant.description}</span>
              </div>

              <div className="quadrant-items">
                {items.map((item) => (
                  <div key={item.id} className="swot-item">
                    <div className="item-content">
                      <p className="item-description">{item.description}</p>
                      <div className="item-metrics">
                        <span className="evidence">E: {item.evidence}</span>
                        <span className="impact">I: {item.impact}</span>
                        <span className="source">{item.source}</span>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(quadrant.key, item.id);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {activeQuadrant === quadrant.key && (
                <div className="add-item-form">
                  <textarea
                    placeholder={`Agregar nueva ${quadrant.title.toLowerCase()}...`}
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="form-textarea"
                  />
                  <div className="form-metrics">
                    <div className="metric-input">
                      <label>Evidencia (0-7)</label>
                      <input
                        type="range"
                        min="0"
                        max="7"
                        value={newItem.evidence}
                        onChange={(e) => setNewItem(prev => ({ ...prev, evidence: e.target.value }))}
                      />
                      <span>{newItem.evidence}</span>
                    </div>
                    <div className="metric-input">
                      <label>Impacto (0-7)</label>
                      <input
                        type="range"
                        min="0"
                        max="7"
                        value={newItem.impact}
                        onChange={(e) => setNewItem(prev => ({ ...prev, impact: e.target.value }))}
                      />
                      <span>{newItem.impact}</span>
                    </div>
                  </div>
                  <button className="add-btn" onClick={addItem}>
                    <Plus size={16} />
                    Agregar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen de Evaluación */}
      <div className="evaluation-summary">
        <h3>Evaluación Ponderada</h3>
        <div className="evaluation-grid">
          <div className="evaluation-section">
            <h4>Ámbito Externo</h4>
            <div className="evaluation-items">
              <div className="eval-item">
                <span>Oportunidades:</span>
                <span className="positive">{swotData.analysis.opportunitiesAvg.weighted}</span>
              </div>
              <div className="eval-item">
                <span>Amenazas:</span>
                <span className="negative">{swotData.analysis.threatsAvg.weighted}</span>
              </div>
            </div>
          </div>
          <div className="evaluation-section">
            <h4>Ámbito Interno</h4>
            <div className="evaluation-items">
              <div className="eval-item">
                <span>Fortalezas:</span>
                <span className="positive">{swotData.analysis.strengthsAvg.weighted}</span>
              </div>
              <div className="eval-item">
                <span>Debilidades:</span>
                <span className="negative">{swotData.analysis.weaknessesAvg.weighted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de Estrategias */}
      {showStrategies && (
        <div className="strategies-panel">
          <div className="strategies-header">
            <h3>Estrategias Derivadas</h3>
            <button 
              className="btn-close"
              onClick={() => setShowStrategies(false)}
            >
              ×
            </button>
          </div>
          <div className="strategies-grid">
            <div className="strategy-quadrant fo">
              <h4>Estrategias FO (Fortalezas-Oportunidades)</h4>
              <p>Usar fortalezas para aprovechar oportunidades</p>
              {swotData.strategies.fo.map(strategy => (
                <div key={strategy.id} className="strategy-item">
                  <span className="priority">P{strategy.priority}</span>
                  <p>{strategy.description}</p>
                </div>
              ))}
            </div>
            
            <div className="strategy-quadrant fa">
              <h4>Estrategias FA (Fortalezas-Amenazas)</h4>
              <p>Usar fortalezas para mitigar amenazas</p>
              {swotData.strategies.fa.map(strategy => (
                <div key={strategy.id} className="strategy-item">
                  <span className="priority">P{strategy.priority}</span>
                  <p>{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwotAnalysis;