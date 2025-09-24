import React, { useState, useEffect } from 'react';
import { Save, Download, Plus, X, Edit3, AlertCircle, TrendingUp, Users, Zap, Leaf, Scale, Building } from 'lucide-react';
import './PestelAnalysis.css';

const PestelAnalysis = () => {
  const [pestelData, setPestelData] = useState({
    political: [],
    economic: [],
    social: [],
    technological: [],
    ecological: [],
    legal: []
  });

  const [currentCategory, setCurrentCategory] = useState('political');
  const [editingItem, setEditingItem] = useState(null);
  const [newVariable, setNewVariable] = useState({
    variable: '',
    opportunity: '',
    threat: '',
    impact: 'medio',
    source: ''
  });
  const [savedAt, setSavedAt] = useState(null);

  // Cargar datos guardados
  useEffect(() => {
    const savedData = localStorage.getItem('strategyCom_pestel');
    if (savedData) {
      setPestelData(JSON.parse(savedData));
    }
  }, []);

  // Guardar datos
  const saveData = () => {
    localStorage.setItem('strategyCom_pestel', JSON.stringify(pestelData));
    setSavedAt(new Date().toLocaleTimeString());
    setTimeout(() => setSavedAt(null), 3000);
  };

  // Exportar datos
  const exportData = () => {
    const dataStr = JSON.stringify(pestelData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'pestel_analysis.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Añadir nueva variable
  const addVariable = () => {
    if (newVariable.variable.trim()) {
      setPestelData(prev => ({
        ...prev,
        [currentCategory]: [...prev[currentCategory], {
          id: Date.now(),
          ...newVariable
        }]
      }));
      setNewVariable({
        variable: '',
        opportunity: '',
        threat: '',
        impact: 'medio',
        source: ''
      });
    }
  };

  // Eliminar variable
  const removeVariable = (category, id) => {
    setPestelData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  // Editar variable
  const editVariable = (category, id, updatedData) => {
    setPestelData(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    }));
  };

  const categories = [
    {
      key: 'political',
      name: 'Político',
      icon: Building,
      color: '#dc2626',
      description: 'Políticas gubernamentales, estabilidad política, regulaciones',
      examples: ['Políticas fiscales', 'Estabilidad gubernamental', 'Regulaciones comerciales']
    },
    {
      key: 'economic',
      name: 'Económico',
      icon: TrendingUp,
      color: '#2563eb',
      description: 'Factores económicos que afectan el mercado',
      examples: ['Tasas de interés', 'Inflación', 'PIB', 'Tipos de cambio']
    },
    {
      key: 'social',
      name: 'Social',
      icon: Users,
      color: '#16a34a',
      description: 'Factores socioculturales y demográficos',
      examples: ['Demografía', 'Cultura', 'Educación', 'Estilo de vida']
    },
    {
      key: 'technological',
      name: 'Tecnológico',
      icon: Zap,
      color: '#9333ea',
      description: 'Innovaciones tecnológicas y digitalización',
      examples: ['I+D', 'Automatización', 'Nuevas tecnologías']
    },
    {
      key: 'ecological',
      name: 'Ecológico',
      icon: Leaf,
      color: '#059669',
      description: 'Factores ambientales y sostenibilidad',
      examples: ['Cambio climático', 'Sostenibilidad', 'Regulaciones ambientales']
    },
    {
      key: 'legal',
      name: 'Legal',
      icon: Scale,
      color: '#dc2626',
      description: 'Marco legal y normativo',
      examples: ['Leyes laborales', 'Propiedad intelectual', 'Normativas sectoriales']
    }
  ];

  const currentCategoryData = categories.find(cat => cat.key === currentCategory);

  return (
    <div className="pestel-container">
      {/* Header */}
      <div className="pestel-header">
        <h1>Análisis PESTEL</h1>
        <p>Evaluación del entorno estratégico de tu emprendimiento</p>
        
        <div className="pestel-actions">
          <button onClick={saveData} className="pestel-btn btn-save">
            <Save className="icon" />
            Guardar
          </button>
          <button onClick={exportData} className="pestel-btn btn-export">
            <Download className="icon" />
            Exportar
          </button>
        </div>

        {savedAt && (
          <div className="save-indicator">
            ✓ Guardado a las {savedAt}
          </div>
        )}
      </div>

      {/* Navegación de categorías */}
      <div className="categories-nav">
        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.key;
            
            return (
              <button
                key={category.key}
                onClick={() => setCurrentCategory(category.key)}
                className={`category-btn ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${category.color}20 0%, rgba(255, 255, 255, 0.95) 50%)`
                    : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isActive ? category.color : 'rgba(255, 255, 255, 0.3)'
                }}
              >
                <Icon className="category-icon" style={{ color: category.color }} />
                <div className="category-name" style={{
                  color: isActive ? category.color : '#374151'
                }}>
                  {category.name}
                </div>
                <div className="category-count">
                  {pestelData[category.key].length} variables
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="pestel-main">
        {/* Panel principal */}
        <div className="main-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              {React.createElement(currentCategoryData.icon, {
                style: { 
                  width: '32px', 
                  height: '32px', 
                  color: currentCategoryData.color 
                }
              })}
              Análisis {currentCategoryData.name}
            </h2>
            <p className="panel-description">
              {currentCategoryData.description}
            </p>
            <div className="panel-examples">
              <strong>Ejemplos:</strong> {currentCategoryData.examples.join(', ')}
            </div>
          </div>

          {/* Formulario para nueva variable */}
          <div className="variable-form">
            <h3 className="form-title">Agregar Nueva Variable</h3>
            
            <div className="form-grid">
              <div>
                <label className="form-label">
                  Variable / Factor *
                </label>
                <input
                  type="text"
                  value={newVariable.variable}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, variable: e.target.value }))}
                  placeholder="Ej: Nuevas regulaciones fiscales"
                  className="form-input"
                />
              </div>

              <div className="form-grid form-grid-two">
                <div>
                  <label className="form-label">Oportunidad</label>
                  <textarea
                    value={newVariable.opportunity}
                    onChange={(e) => setNewVariable(prev => ({ ...prev, opportunity: e.target.value }))}
                    placeholder="¿Cómo puede beneficiar a tu negocio?"
                    rows="3"
                    className="form-textarea opportunity"
                  />
                </div>

                <div>
                  <label className="form-label">Amenaza</label>
                  <textarea
                    value={newVariable.threat}
                    onChange={(e) => setNewVariable(prev => ({ ...prev, threat: e.target.value }))}
                    placeholder="¿Qué riesgos representa?"
                    rows="3"
                    className="form-textarea threat"
                  />
                </div>
              </div>

              <div className="form-grid form-grid-two">
                <div>
                  <label className="form-label">Nivel de Impacto</label>
                  <select
                    value={newVariable.impact}
                    onChange={(e) => setNewVariable(prev => ({ ...prev, impact: e.target.value }))}
                    className="form-select"
                  >
                    <option value="bajo">Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Fuente de Información</label>
                  <input
                    type="text"
                    value={newVariable.source}
                    onChange={(e) => setNewVariable(prev => ({ ...prev, source: e.target.value }))}
                    placeholder="Ej: INE, Banco Central, estudio sectorial"
                    className="form-input"
                  />
                </div>
              </div>

              <button
                onClick={addVariable}
                disabled={!newVariable.variable.trim()}
                className="add-btn"
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                Agregar Variable
              </button>
            </div>
          </div>

          {/* Lista de variables */}
          <div className="variables-section">
            <h3 className="variables-title">
              Variables Identificadas ({pestelData[currentCategory].length})
            </h3>

            {pestelData[currentCategory].length === 0 ? (
              <div className="empty-state">
                <AlertCircle className="empty-icon" />
                <p className="empty-text">
                  No hay variables identificadas para esta categoría. 
                  Comienza agregando factores relevantes del entorno {currentCategoryData.name.toLowerCase()}.
                </p>
              </div>
            ) : (
              <div className="variables-grid">
                {pestelData[currentCategory].map((variable, index) => (
                  <div
                    key={variable.id}
                    className="variable-card"
                    style={{ borderColor: `${currentCategoryData.color}20` }}
                  >
                    <div className="variable-header">
                      <h4 className="variable-title">{variable.variable}</h4>
                      <div className="variable-actions">
                        <span className={`impact-badge impact-${variable.impact}`}>
                          {variable.impact.toUpperCase()}
                        </span>
                        <button
                          onClick={() => removeVariable(currentCategory, variable.id)}
                          className="delete-btn"
                        >
                          <X style={{ width: '12px', height: '12px' }} />
                        </button>
                      </div>
                    </div>

                    <div className="variable-content">
                      {variable.opportunity && (
                        <div className="content-section">
                          <div className="content-label opportunity">Oportunidad</div>
                          <p className="content-text">{variable.opportunity}</p>
                        </div>
                      )}

                      {variable.threat && (
                        <div className="content-section">
                          <div className="content-label threat">Amenaza</div>
                          <p className="content-text">{variable.threat}</p>
                        </div>
                      )}
                    </div>

                    {variable.source && (
                      <div className="variable-source">
                        Fuente: {variable.source}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Panel lateral - Matriz de evaluación */}
        <div className="matrix-panel">
          <h3 className="matrix-title">Matriz de Evaluación PESTEL</h3>

          {/* Tabla resumen */}
          <div className="matrix-table">
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th className="center oportunidad">Oport.</th>
                  <th className="center amenaza">Amenaza</th>
                  <th className="center">Impacto</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <React.Fragment key={category.key}>
                    <tr style={{ background: `${category.color}10` }}>
                      <td
                        colSpan="4"
                        className="category-row"
                        style={{ color: category.color }}
                      >
                        {category.name.toUpperCase()}
                      </td>
                    </tr>
                    {pestelData[category.key].length === 0 ? (
                      <tr>
                        <td colSpan="4" className="empty-row">
                          Sin variables identificadas
                        </td>
                      </tr>
                    ) : (
                      pestelData[category.key].map((variable, index) => (
                        <tr key={variable.id}>
                          <td className="variable-name">
                            {variable.variable}
                          </td>
                          <td className="center">
                            {variable.opportunity ? (
                              <div className="indicator-dot dot-opportunity" />
                            ) : (
                              <span style={{ color: '#d1d5db' }}>—</span>
                            )}
                          </td>
                          <td className="center">
                            {variable.threat ? (
                              <div className="indicator-dot dot-threat" />
                            ) : (
                              <span style={{ color: '#d1d5db' }}>—</span>
                            )}
                          </td>
                          <td className="center">
                            <span className={`impact-code impact-${variable.impact}`}>
                              {variable.impact === 'alto' ? 'A' : 
                               variable.impact === 'medio' ? 'M' : 'B'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Estadísticas resumen */}
          <div className="stats-section">
            <h4 className="stats-title">Resumen del Análisis</h4>
            
            <div className="stats-grid">
              {categories.map((category) => {
                const count = pestelData[category.key].length;
                const opportunities = pestelData[category.key].filter(v => v.opportunity).length;
                const threats = pestelData[category.key].filter(v => v.threat).length;
                
                return (
                  <div 
                    key={category.key} 
                    className="stat-row"
                    style={{
                      background: count > 0 ? `${category.color}10` : '#f9fafb'
                    }}
                  >
                    <span className="stat-name">{category.name}</span>
                    <div className="stat-counts">
                      <span className="stat-count count-opportunities">
                        O:{opportunities}
                      </span>
                      <span className="stat-count count-threats">
                        A:{threats}
                      </span>
                      <span className="stat-count count-total">
                        ({count})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leyenda */}
          <div className="legend-section">
            <h4 className="legend-title">Leyenda</h4>
            
            <div className="legend-grid">
              <div className="legend-item">
                <div className="legend-dot dot-opportunity" />
                <span className="legend-text">Oportunidad identificada</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot dot-threat" />
                <span className="legend-text">Amenaza identificada</span>
              </div>
              <div className="legend-item">
                <span className="legend-badge impact-alto">A</span>
                <span className="legend-text">Alto impacto</span>
              </div>
              <div className="legend-item">
                <span className="legend-badge impact-medio">M</span>
                <span className="legend-text">Medio impacto</span>
              </div>
              <div className="legend-item">
                <span className="legend-badge impact-bajo">B</span>
                <span className="legend-text">Bajo impacto</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guía de ayuda inferior */}
      <div className="guide-section">
        <h3 className="guide-title">Guía para el Análisis PESTEL</h3>

        <div className="guide-grid">
          {categories.map((category) => (
            <div key={category.key} className="guide-card">
              <div className="guide-header">
                <category.icon style={{ width: '24px', height: '24px', color: category.color }} />
                <h4 className="guide-card-title">{category.name}</h4>
              </div>
              
              <p className="guide-description">{category.description}</p>
              
              <div>
                <div className="guide-examples-title">Ejemplos de variables:</div>
                <ul className="guide-examples-list">
                  {category.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestelAnalysis;