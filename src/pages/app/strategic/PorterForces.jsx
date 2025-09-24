import React, { useState, useEffect } from 'react';
import { Save, Download, Target, Users, ArrowUpCircle, ArrowDownCircle, Shield, Lightbulb, AlertCircle } from 'lucide-react';
import './PorterForces.css';

const PorterForces = () => {
  const [industry, setIndustry] = useState('');
  const [currentForce, setCurrentForce] = useState('threat_new_entrants');
  const [savedAt, setSavedAt] = useState(null);
  
  const [porterData, setPorterData] = useState({
    industry: '',
    threat_new_entrants: {
      variables: {},
      analysis: '',
      score: 0
    },
    bargaining_power_suppliers: {
      variables: {},
      analysis: '',
      score: 0
    },
    bargaining_power_buyers: {
      variables: {},
      analysis: '',
      score: 0
    },
    threat_substitutes: {
      variables: {},
      analysis: '',
      score: 0
    },
    competitive_rivalry: {
      variables: {},
      analysis: '',
      score: 0
    }
  });

  // Cargar datos guardados
  useEffect(() => {
    const savedData = localStorage.getItem('strategyCom_porter');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPorterData(data);
      setIndustry(data.industry || '');
    }
  }, []);

  // Guardar datos
  const saveData = () => {
    const dataToSave = { ...porterData, industry };
    localStorage.setItem('strategyCom_porter', JSON.stringify(dataToSave));
    setSavedAt(new Date().toLocaleTimeString());
    setTimeout(() => setSavedAt(null), 3000);
  };

  // Exportar datos
  const exportData = () => {
    const dataStr = JSON.stringify({ ...porterData, industry }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'porter_forces_analysis.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Actualizar variable de fuerza
  const updateVariable = (force, variable, value) => {
    setPorterData(prev => ({
      ...prev,
      [force]: {
        ...prev[force],
        variables: {
          ...prev[force].variables,
          [variable]: parseInt(value)
        }
      }
    }));
  };

  // Actualizar análisis de fuerza
  const updateAnalysis = (force, analysis) => {
    setPorterData(prev => ({
      ...prev,
      [force]: {
        ...prev[force],
        analysis
      }
    }));
  };

  // Calcular score promedio de una fuerza
  const calculateForceScore = (force) => {
    const variables = porterData[force].variables;
    const values = Object.values(variables).filter(v => v > 0);
    if (values.length === 0) return 0;
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1);
  };

  // Calcular atractivo de la industria
  const calculateIndustryAttractiveness = () => {
    const forces = ['threat_new_entrants', 'bargaining_power_suppliers', 'bargaining_power_buyers', 'threat_substitutes', 'competitive_rivalry'];
    const scores = forces.map(force => parseFloat(calculateForceScore(force))).filter(score => score > 0);
    if (scores.length === 0) return 0;
    return (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
  };

  // Obtener nivel de atractivo
  const getAttractivenessLevel = (score) => {
    if (score <= 2) return { level: 'Alto', class: 'attractiveness-high' };
    if (score <= 3.5) return { level: 'Medio', class: 'attractiveness-medium' };
    return { level: 'Bajo', class: 'attractiveness-low' };
  };

  // Obtener color de score
  const getScoreColor = (score) => {
    if (score <= 2) return '#10b981';
    if (score <= 3.5) return '#f59e0b';
    return '#ef4444';
  };

  const forces = [
    {
      key: 'threat_new_entrants',
      name: 'Amenaza de Nuevos Entrantes',
      icon: ArrowUpCircle,
      color: '#ef4444',
      description: 'Facilidad con la que nuevas empresas pueden entrar al mercado',
      variables: [
        { key: 'barriers_to_entry', name: 'Barreras de entrada', description: 'Nivel de dificultad para ingresar al mercado' },
        { key: 'capital_requirements', name: 'Requerimientos de capital', description: 'Inversión inicial necesaria' },
        { key: 'economies_of_scale', name: 'Economías de escala', description: 'Ventajas de costos por volumen' },
        { key: 'brand_loyalty', name: 'Lealtad de marca', description: 'Grado de fidelidad de los clientes' },
        { key: 'government_regulation', name: 'Regulación gubernamental', description: 'Restricciones legales y normativas' }
      ]
    },
    {
      key: 'bargaining_power_suppliers',
      name: 'Poder de Negociación de Proveedores',
      icon: Users,
      color: '#8b5cf6',
      description: 'Capacidad de los proveedores para influir en precios y términos',
      variables: [
        { key: 'supplier_concentration', name: 'Concentración de proveedores', description: 'Número de proveedores disponibles' },
        { key: 'switching_costs', name: 'Costos de cambio', description: 'Dificultad para cambiar de proveedor' },
        { key: 'input_importance', name: 'Importancia del insumo', description: 'Criticidad del insumo para el negocio' },
        { key: 'supplier_integration', name: 'Integración del proveedor', description: 'Posibilidad de integración vertical' },
        { key: 'supplier_differentiation', name: 'Diferenciación del proveedor', description: 'Uniquidad del producto/servicio del proveedor' }
      ]
    },
    {
      key: 'bargaining_power_buyers',
      name: 'Poder de Negociación de Compradores',
      icon: Target,
      color: '#059669',
      description: 'Capacidad de los clientes para influir en precios y condiciones',
      variables: [
        { key: 'buyer_concentration', name: 'Concentración de compradores', description: 'Número y tamaño de los compradores' },
        { key: 'buyer_switching_costs', name: 'Costos de cambio del comprador', description: 'Facilidad para cambiar de proveedor' },
        { key: 'price_sensitivity', name: 'Sensibilidad al precio', description: 'Importancia del precio en la decisión' },
        { key: 'product_differentiation', name: 'Diferenciación del producto', description: 'Grado de diferenciación percibida' },
        { key: 'buyer_information', name: 'Información del comprador', description: 'Nivel de información disponible' }
      ]
    },
    {
      key: 'threat_substitutes',
      name: 'Amenaza de Productos Sustitutos',
      icon: ArrowDownCircle,
      color: '#f59e0b',
      description: 'Disponibilidad de productos alternativos que satisfacen la misma necesidad',
      variables: [
        { key: 'substitute_availability', name: 'Disponibilidad de sustitutos', description: 'Cantidad de alternativas disponibles' },
        { key: 'relative_price', name: 'Precio relativo', description: 'Competitividad de precios vs sustitutos' },
        { key: 'performance_quality', name: 'Rendimiento y calidad', description: 'Comparación de calidad con sustitutos' },
        { key: 'switching_propensity', name: 'Propensión al cambio', description: 'Facilidad para adoptar sustitutos' },
        { key: 'substitute_trends', name: 'Tendencias de sustitutos', description: 'Evolución y mejora de alternativas' }
      ]
    },
    {
      key: 'competitive_rivalry',
      name: 'Rivalidad Competitiva',
      icon: Shield,
      color: '#dc2626',
      description: 'Intensidad de la competencia entre empresas existentes',
      variables: [
        { key: 'competitor_number', name: 'Número de competidores', description: 'Cantidad de empresas en el mercado' },
        { key: 'market_growth', name: 'Crecimiento del mercado', description: 'Tasa de expansión del mercado' },
        { key: 'product_differentiation_comp', name: 'Diferenciación de productos', description: 'Nivel de diferenciación entre competidores' },
        { key: 'exit_barriers', name: 'Barreras de salida', description: 'Dificultad para abandonar el mercado' },
        { key: 'competitive_intensity', name: 'Intensidad competitiva', description: 'Agresividad de la competencia' }
      ]
    }
  ];

  const currentForceData = forces.find(force => force.key === currentForce);
  const forceScore = calculateForceScore(currentForce);
  const industryScore = calculateIndustryAttractiveness();
  const attractiveness = getAttractivenessLevel(industryScore);

  // Generar recomendaciones
  const getRecommendations = () => {
    const recommendations = [];
    const scores = forces.map(force => ({
      name: force.name,
      score: parseFloat(calculateForceScore(force.key))
    })).filter(f => f.score > 0);

    if (scores.length === 0) return ['Complete el análisis de las fuerzas para obtener recomendaciones'];

    const highestThreat = scores.reduce((max, force) => force.score > max.score ? force : max);
    const lowestThreat = scores.reduce((min, force) => force.score < min.score ? force : min);

    if (industryScore > 3.5) {
      recommendations.push('La industria presenta baja atractividad. Considere estrategias defensivas.');
    } else if (industryScore <= 2) {
      recommendations.push('La industria es altamente atractiva. Aproveche oportunidades de crecimiento.');
    }

    if (highestThreat.score >= 4) {
      recommendations.push(`Priorice estrategias para mitigar: ${highestThreat.name}`);
    }

    if (lowestThreat.score <= 2) {
      recommendations.push(`Aproveche la ventaja en: ${lowestThreat.name}`);
    }

    return recommendations.length > 0 ? recommendations : ['Continúe monitoreando las fuerzas del entorno'];
  };

  return (
    <div className="porter-container">
      {/* Header */}
      <div className="porter-header">
        <h1>Análisis de las 5 Fuerzas de Porter</h1>
        <p>Evaluación de la atractividad y competitividad de tu industria</p>
        
        <div className="porter-actions">
          <button onClick={saveData} className="porter-btn btn-save">
            <Save style={{ width: '16px', height: '16px' }} />
            Guardar
          </button>
          <button onClick={exportData} className="porter-btn btn-export">
            <Download style={{ width: '16px', height: '16px' }} />
            Exportar
          </button>
        </div>

        {savedAt && (
          <div className="save-indicator">
            ✓ Guardado a las {savedAt}
          </div>
        )}
      </div>

      {/* Definición de industria */}
      <div className="industry-section">
        <h3 className="industry-title">Definición de la Industria</h3>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Ej: Tecnología móvil, Restaurantes, E-commerce, etc."
          className="industry-input"
        />
      </div>

      {/* Navegación de fuerzas */}
      <div className="forces-nav">
        <div className="forces-grid">
          {forces.map((force) => {
            const Icon = force.icon;
            const isActive = currentForce === force.key;
            const score = calculateForceScore(force.key);
            
            return (
              <button
                key={force.key}
                onClick={() => setCurrentForce(force.key)}
                className={`force-tab ${isActive ? 'active' : ''}`}
                style={{
                  borderColor: isActive ? force.color : 'rgba(255, 255, 255, 0.3)'
                }}
              >
                <Icon 
                  className="force-icon" 
                  style={{ color: force.color }} 
                />
                <div 
                  className="force-name"
                  style={{ color: isActive ? force.color : '#374151' }}
                >
                  {force.name}
                </div>
                <div 
                  className="force-score"
                  style={{ color: score > 0 ? getScoreColor(score) : '#6b7280' }}
                >
                  {score > 0 ? `Score: ${score}` : 'Sin evaluar'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="porter-main">
        {/* Panel principal */}
        <div className="main-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              {React.createElement(currentForceData.icon, {
                style: { 
                  width: '32px', 
                  height: '32px', 
                  color: currentForceData.color 
                }
              })}
              {currentForceData.name}
            </h2>
            <p className="panel-description">
              {currentForceData.description}
            </p>
          </div>

          {/* Variables de la fuerza */}
          <div className="variables-section">
            <h3 className="variables-title">Variables de Evaluación</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Califique cada variable del 1 (muy bajo/favorable) al 5 (muy alto/desfavorable)
            </p>
            
            {currentForceData.variables.map((variable) => (
              <div key={variable.key} className="variable-item">
                <div className="variable-info">
                  <div className="variable-name">{variable.name}</div>
                  <div className="variable-description">{variable.description}</div>
                </div>
                <div className="variable-rating">
                  <select
                    value={porterData[currentForce].variables[variable.key] || 0}
                    onChange={(e) => updateVariable(currentForce, variable.key, e.target.value)}
                    className="rating-select"
                  >
                    <option value={0}>Seleccionar</option>
                    <option value={1}>1 - Muy Bajo</option>
                    <option value={2}>2 - Bajo</option>
                    <option value={3}>3 - Medio</option>
                    <option value={4}>4 - Alto</option>
                    <option value={5}>5 - Muy Alto</option>
                  </select>
                  <div 
                    className={`rating-value rating-${porterData[currentForce].variables[variable.key] || 0}`}
                  >
                    {porterData[currentForce].variables[variable.key] || '-'}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: `${currentForceData.color}10`, 
              borderRadius: '8px',
              borderLeft: `4px solid ${currentForceData.color}`
            }}>
              <strong style={{ color: currentForceData.color }}>
                Score Promedio: {forceScore > 0 ? forceScore : 'No calculado'}
              </strong>
            </div>
          </div>

          {/* Análisis de la fuerza */}
          <div className="force-analysis">
            <h3 className="analysis-title">Análisis de la Fuerza</h3>
            <textarea
              value={porterData[currentForce].analysis}
              onChange={(e) => updateAnalysis(currentForce, e.target.value)}
              placeholder={`Describe el impacto de ${currentForceData.name.toLowerCase()} en tu industria. Incluye factores clave, tendencias y su efecto en la competitividad...`}
              className="analysis-textarea"
            />
          </div>
        </div>

        {/* Panel lateral - Resumen */}
        <div className="summary-panel">
          <h3 className="summary-title">Resumen del Análisis</h3>

          {/* Resumen de fuerzas */}
          <div className="forces-summary">
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
              Evaluación por Fuerza
            </h4>
            {forces.map((force) => {
              const score = calculateForceScore(force.key);
              return (
                <div key={force.key} className="summary-item">
                  <div className="summary-force">{force.name}</div>
                  <div className="summary-score">
                    <div 
                      className="score-value"
                      style={{ color: score > 0 ? getScoreColor(score) : '#6b7280' }}
                    >
                      {score > 0 ? score : '-'}
                    </div>
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{ 
                          width: score > 0 ? `${(score / 5) * 100}%` : '0%',
                          background: score > 0 ? getScoreColor(score) : '#e5e7eb'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Métricas globales */}
          <div className="global-metrics">
            <h4 className="metrics-title">Atractivo de la Industria</h4>
            <div className="metric-item">
              <div className="metric-label">Score Promedio</div>
              <div 
                className={`metric-value ${attractiveness.class}`}
              >
                {industryScore > 0 ? industryScore : '-'}
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Nivel de Atractivo</div>
              <div 
                className={`metric-value ${attractiveness.class}`}
              >
                {industryScore > 0 ? attractiveness.level : '-'}
              </div>
            </div>
            
            {industry && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: 'rgba(59, 130, 246, 0.1)', 
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}>
                <strong>Industria:</strong> {industry}
              </div>
            )}
          </div>

          {/* Recomendaciones */}
          <div className="recommendations">
            <h4 className="recommendations-title">Recomendaciones</h4>
            {getRecommendations().map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <Lightbulb className="recommendation-icon" />
                <div className="recommendation-text">{recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
          Guía de Interpretación
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
            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>Score 1-2: Favorable</h4>
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              La fuerza presenta poca amenaza para la industria. Condiciones favorables para el negocio.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Score 3-3.5: Moderado</h4>
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              La fuerza presenta un impacto moderado. Requiere monitoreo y estrategias específicas.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ color: '#ef4444', marginBottom: '1rem' }}>Score 4-5: Desfavorable</h4>
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              La fuerza representa una amenaza significativa. Requiere estrategias defensivas inmediatas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorterForces;