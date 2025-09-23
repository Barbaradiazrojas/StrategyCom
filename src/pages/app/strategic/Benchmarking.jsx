import React, { useState, useEffect } from 'react';
import { Save, Download, Plus, X, Lightbulb, Target, TrendingUp, Users, AlertCircle } from 'lucide-react';
import './Benchmarking.css';

const Benchmarking = () => {
  const [savedAt, setSavedAt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  
  const [benchmarkingData, setBenchmarkingData] = useState({
    project: '',
    competitors: [],
    criteria: [
      'Nombre',
      'Producto/Servicio',
      'Precio',
      'Calidad',
      'Innovación',
      'Servicio al Cliente',
      'Presencia Digital',
      'Fortalezas',
      'Debilidades'
    ],
    comparisons: {}
  });

  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    description: '',
    website: '',
    marketPosition: ''
  });

  const [newCriterion, setNewCriterion] = useState('');

  // Cargar datos guardados
  useEffect(() => {
    const savedData = localStorage.getItem('strategyCom_benchmarking');
    if (savedData) {
      const data = JSON.parse(savedData);
      setBenchmarkingData(data);
      setProjectDescription(data.project || '');
    }
  }, []);

  // Guardar datos
  const saveData = () => {
    const dataToSave = { ...benchmarkingData, project: projectDescription };
    localStorage.setItem('strategyCom_benchmarking', JSON.stringify(dataToSave));
    setSavedAt(new Date().toLocaleTimeString());
    setTimeout(() => setSavedAt(null), 3000);
  };

  // Exportar datos
  const exportData = () => {
    const dataStr = JSON.stringify({ ...benchmarkingData, project: projectDescription }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'benchmarking_analysis.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Agregar competidor
  const addCompetitor = () => {
    if (newCompetitor.name.trim()) {
      const competitor = {
        id: Date.now(),
        ...newCompetitor
      };
      
      setBenchmarkingData(prev => ({
        ...prev,
        competitors: [...prev.competitors, competitor]
      }));
      
      setNewCompetitor({
        name: '',
        description: '',
        website: '',
        marketPosition: ''
      });
      
      setShowModal(false);
    }
  };

  // Eliminar competidor
  const removeCompetitor = (competitorId) => {
    setBenchmarkingData(prev => {
      const newComparisons = { ...prev.comparisons };
      // Eliminar datos del competidor de las comparaciones
      Object.keys(newComparisons).forEach(criterion => {
        if (newComparisons[criterion][competitorId]) {
          delete newComparisons[criterion][competitorId];
        }
      });
      
      return {
        ...prev,
        competitors: prev.competitors.filter(comp => comp.id !== competitorId),
        comparisons: newComparisons
      };
    });
  };

  // Agregar criterio
  const addCriterion = () => {
    if (newCriterion.trim() && !benchmarkingData.criteria.includes(newCriterion.trim())) {
      setBenchmarkingData(prev => ({
        ...prev,
        criteria: [...prev.criteria, newCriterion.trim()]
      }));
      setNewCriterion('');
    }
  };

  // Eliminar criterio
  const removeCriterion = (criterion) => {
    setBenchmarkingData(prev => {
      const newComparisons = { ...prev.comparisons };
      delete newComparisons[criterion];
      
      return {
        ...prev,
        criteria: prev.criteria.filter(c => c !== criterion),
        comparisons: newComparisons
      };
    });
  };

  // Actualizar comparación
  const updateComparison = (criterion, competitorId, value) => {
    setBenchmarkingData(prev => ({
      ...prev,
      comparisons: {
        ...prev.comparisons,
        [criterion]: {
          ...prev.comparisons[criterion],
          [competitorId]: value
        }
      }
    }));
  };

  // Obtener valor de comparación
  const getComparisonValue = (criterion, competitorId) => {
    return benchmarkingData.comparisons[criterion]?.[competitorId] || '';
  };

  // Determinar tipo de input según el criterio
  const getInputType = (criterion) => {
    const ratingCriteria = ['Precio', 'Calidad', 'Innovación', 'Servicio al Cliente', 'Presencia Digital'];
    if (ratingCriteria.includes(criterion)) {
      return 'rating';
    }
    
    const textAreaCriteria = ['Fortalezas', 'Debilidades', 'Producto/Servicio'];
    if (textAreaCriteria.includes(criterion)) {
      return 'textarea';
    }
    
    return 'text';
  };

  // Renderizar input según el tipo
  const renderInput = (criterion, competitor) => {
    const value = getComparisonValue(criterion, competitor.id);
    const inputType = getInputType(criterion);
    
    if (inputType === 'rating') {
      return (
        <select
          value={value}
          onChange={(e) => updateComparison(criterion, competitor.id, e.target.value)}
          className={`rating-select rating-${value}`}
        >
          <option value="">-</option>
          <option value="1">1 - Muy Bajo</option>
          <option value="2">2 - Bajo</option>
          <option value="3">3 - Medio</option>
          <option value="4">4 - Alto</option>
          <option value="5">5 - Muy Alto</option>
        </select>
      );
    }
    
    if (inputType === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => updateComparison(criterion, competitor.id, e.target.value)}
          placeholder={`Describe ${criterion.toLowerCase()} de ${competitor.name}`}
          rows="2"
        />
      );
    }
    
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => updateComparison(criterion, competitor.id, e.target.value)}
        placeholder={`${criterion} de ${competitor.name}`}
      />
    );
  };

  return (
    <div className="benchmarking-container">
      {/* Header */}
      <div className="benchmarking-header">
        <h1>Análisis de Benchmarking</h1>
        <p>Compara tu proyecto con la competencia para identificar oportunidades y ventajas</p>
        
        <div className="benchmarking-actions">
          <button onClick={saveData} className="benchmarking-btn btn-save">
            <Save style={{ width: '16px', height: '16px' }} />
            Guardar
          </button>
          <button onClick={exportData} className="benchmarking-btn btn-export">
            <Download style={{ width: '16px', height: '16px' }} />
            Exportar
          </button>
          <button onClick={() => setShowModal(true)} className="benchmarking-btn btn-add-competitor">
            <Plus style={{ width: '16px', height: '16px' }} />
            Agregar Competidor
          </button>
        </div>

        {savedAt && (
          <div className="save-indicator">
            ✓ Guardado a las {savedAt}
          </div>
        )}
      </div>

      {/* Información del proyecto */}
      <div className="project-info">
        <h3>Descripción de tu Proyecto</h3>
        <input
          type="text"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Describe brevemente tu proyecto/emprendimiento para contextualizar la comparación..."
          className="project-input"
        />
      </div>

      {/* Contenido principal */}
      <div className="benchmarking-main">
        {/* Tabla de comparación */}
        <div className="comparison-table-container">
          {benchmarkingData.competitors.length === 0 ? (
            <div className="empty-state">
              <Target className="empty-icon" />
              <h3 className="empty-title">No hay competidores agregados</h3>
              <p className="empty-text">
                Comienza agregando competidores para realizar el análisis comparativo
              </p>
              <button 
                onClick={() => setShowModal(true)}
                className="benchmarking-btn btn-add-competitor"
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                Agregar Primer Competidor
              </button>
            </div>
          ) : (
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Criterio de Comparación</th>
                    {benchmarkingData.competitors.map(competitor => (
                      <th key={competitor.id} className="competitor-header">
                        {competitor.name}
                        <button
                          onClick={() => removeCompetitor(competitor.id)}
                          className="delete-competitor"
                          title="Eliminar competidor"
                        >
                          <X style={{ width: '12px', height: '12px' }} />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benchmarkingData.criteria.map((criterion, index) => (
                    <tr key={criterion}>
                      <td className="criterion-row">
                        {criterion}
                      </td>
                      {benchmarkingData.competitors.map(competitor => (
                        <td key={competitor.id} className="editable-cell">
                          {renderInput(criterion, competitor)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Panel lateral */}
        <div className="side-panel">
          <h3>Panel de Control</h3>

          {/* Resumen de competidores */}
          <div className="competitors-summary">
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Resumen
            </h4>
            <div className="summary-item">
              <span className="summary-label">Competidores</span>
              <span className="summary-value">{benchmarkingData.competitors.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Criterios</span>
              <span className="summary-value">{benchmarkingData.criteria.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Comparaciones</span>
              <span className="summary-value">
                {Object.values(benchmarkingData.comparisons).reduce((total, criterion) => 
                  total + Object.keys(criterion).length, 0
                )}
              </span>
            </div>
          </div>

          {/* Gestión de criterios */}
          <div className="criteria-section">
            <h4 className="criteria-title">Criterios de Evaluación</h4>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                placeholder="Nuevo criterio..."
                className="modal-input"
                style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem' }}
                onKeyPress={(e) => e.key === 'Enter' && addCriterion()}
              />
              <button
                onClick={addCriterion}
                className="benchmarking-btn"
                style={{ 
                  padding: '0.5rem', 
                  background: 'var(--success-gradient)',
                  minWidth: 'auto'
                }}
              >
                <Plus style={{ width: '14px', height: '14px' }} />
              </button>
            </div>

            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {benchmarkingData.criteria.map((criterion) => (
                <div key={criterion} className="criterion-item">
                  <span className="criterion-name">{criterion}</span>
                  <button
                    onClick={() => removeCriterion(criterion)}
                    className="remove-criterion"
                  >
                    <X style={{ width: '12px', height: '12px' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Guía de ayuda */}
          <div className="help-section">
            <h4 className="help-title">Guía de Benchmarking</h4>
            
            <div className="help-item">
              <Lightbulb className="help-icon" />
              <div className="help-text">
                <strong>Objetividad:</strong> Mantén un análisis imparcial basado en datos reales
              </div>
            </div>
            
            <div className="help-item">
              <Target className="help-icon" />
              <div className="help-text">
                <strong>Criterios relevantes:</strong> Evalúa aspectos que impacten en tu ventaja competitiva
              </div>
            </div>
            
            <div className="help-item">
              <TrendingUp className="help-icon" />
              <div className="help-text">
                <strong>Oportunidades:</strong> Identifica gaps donde puedes diferenciarte
              </div>
            </div>
            
            <div className="help-item">
              <Users className="help-icon" />
              <div className="help-text">
                <strong>Competidores directos:</strong> Incluye empresas que atienden tu mismo mercado
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar competidor */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Agregar Nuevo Competidor</h3>
            
            <div className="modal-form">
              <div>
                <label className="modal-label">Nombre del Competidor *</label>
                <input
                  type="text"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Amazon, Spotify, McDonald's"
                  className="modal-input"
                />
              </div>
              
              <div>
                <label className="modal-label">Descripción</label>
                <textarea
                  value={newCompetitor.description}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Breve descripción de la empresa o producto..."
                  className="modal-input"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="modal-label">Sitio Web</label>
                <input
                  type="url"
                  value={newCompetitor.website}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://ejemplo.com"
                  className="modal-input"
                />
              </div>
              
              <div>
                <label className="modal-label">Posición en el Mercado</label>
                <select
                  value={newCompetitor.marketPosition}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, marketPosition: e.target.value }))}
                  className="modal-input"
                >
                  <option value="">Seleccionar...</option>
                  <option value="lider">Líder del mercado</option>
                  <option value="retador">Retador</option>
                  <option value="seguidor">Seguidor</option>
                  <option value="nicho">Especialista de nicho</option>
                  <option value="emergente">Empresa emergente</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="modal-btn modal-btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={addCompetitor}
                disabled={!newCompetitor.name.trim()}
                className="modal-btn modal-btn-primary"
                style={{ 
                  opacity: newCompetitor.name.trim() ? 1 : 0.6,
                  cursor: newCompetitor.name.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Agregar Competidor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guía de interpretación */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '2rem',
        marginTop: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#2d3748',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Cómo realizar un Benchmarking efectivo
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ color: '#3b82f6', marginBottom: '1rem' }}>1. Selecciona Competidores Relevantes</h4>
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              Incluye competidores directos, indirectos y empresas aspiracionales. 
              Considera diferentes tamaños y posiciones en el mercado.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>2. Define Criterios Objetivos</h4>
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              Establece criterios medibles y relevantes para tu negocio. 
              Incluye aspectos cuantitativos y cualitativos.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>3. Analiza y Actúa</h4>
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              Identifica gaps, oportunidades de mejora y ventajas competitivas. 
              Desarrolla estrategias basadas en los hallazgos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benchmarking;