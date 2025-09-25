/* 
ARCHIVO: CompetitiveAdvantage.jsx
RUTA: C:\Users\user\Downloads\proyecto1_strategycom\frontend\src\pages\app\strategic\CompetitiveAdvantage.jsx
*/

import React, { useState, useEffect } from 'react';
import { 
  Trophy,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Star,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  DollarSign,
  Award,
  ArrowRight,
  Plus,
  Minus,
  Eye,
  Settings
} from 'lucide-react';
import './CompetitiveAdvantage.css';

const CompetitiveAdvantage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    industry: '',
    targetMarket: ''
  });
  const [competitorData, setCompetitorData] = useState([]);
  const [selectedAdvantages, setSelectedAdvantages] = useState({});
  const [advantageEvaluations, setAdvantageEvaluations] = useState({});
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Tipos de ventajas competitivas categorizadas
  const advantageCategories = [
    {
      id: 'cost',
      title: 'Ventajas de Costo',
      icon: DollarSign,
      color: 'green',
      description: 'Capacidad de ofrecer productos/servicios a menor costo',
      advantages: [
        'Economías de escala en producción',
        'Eficiencia operacional superior',
        'Acceso a materias primas más baratas',
        'Automatización y tecnología avanzada',
        'Ubicación geográfica estratégica',
        'Procesos optimizados y lean manufacturing',
        'Integración vertical de la cadena de suministro'
      ]
    },
    {
      id: 'differentiation',
      title: 'Ventajas de Diferenciación',
      icon: Star,
      color: 'blue',
      description: 'Ofrecer algo único y valorado por los clientes',
      advantages: [
        'Producto/servicio innovador y único',
        'Marca fuerte y reconocida',
        'Calidad superior del producto',
        'Experiencia del cliente excepcional',
        'Diseño y estética distintiva',
        'Funcionalidades exclusivas',
        'Servicio postventa superior'
      ]
    },
    {
      id: 'focus',
      title: 'Ventajas de Enfoque',
      icon: Target,
      color: 'purple',
      description: 'Especialización en nichos específicos de mercado',
      advantages: [
        'Especialización en segmento específico',
        'Conocimiento profundo del nicho',
        'Adaptación personalizada a necesidades',
        'Relaciones estrechas con clientes clave',
        'Expertise en mercado local/regional',
        'Customización para industrias específicas',
        'Servicio altamente especializado'
      ]
    },
    {
      id: 'resources',
      title: 'Ventajas de Recursos',
      icon: Trophy,
      color: 'orange',
      description: 'Recursos únicos y difíciles de imitar',
      advantages: [
        'Tecnología propietaria o patentada',
        'Talento humano excepcional',
        'Base de datos única de clientes',
        'Ubicaciones privilegiadas',
        'Licencias exclusivas o permisos',
        'Capital financiero abundante',
        'Red de contactos y alianzas estratégicas'
      ]
    },
    {
      id: 'capabilities',
      title: 'Ventajas de Capacidades',
      icon: Zap,
      color: 'red',
      description: 'Habilidades organizacionales distintivas',
      advantages: [
        'Capacidad de innovación continua',
        'Agilidad y velocidad de respuesta',
        'Cultura organizacional fuerte',
        'Sistemas de información superiores',
        'Procesos de toma de decisiones eficientes',
        'Capacidad de aprendizaje organizacional',
        'Flexibilidad y adaptabilidad'
      ]
    },
    {
      id: 'market',
      title: 'Ventajas de Mercado',
      icon: Users,
      color: 'indigo',
      description: 'Posicionamiento y acceso privilegiado al mercado',
      advantages: [
        'Primera ventaja en el mercado (first mover)',
        'Red de distribución establecida',
        'Base de clientes leales',
        'Reconocimiento de marca establecido',
        'Barreras de entrada para competidores',
        'Contratos exclusivos con proveedores',
        'Posicionamiento estratégico en la mente del consumidor'
      ]
    }
  ];

  // Criterios de evaluación
  const evaluationCriteria = [
    { 
      id: 'impact', 
      label: 'Impacto en el Negocio', 
      description: '¿Qué tanto puede impactar positivamente en tus resultados?'
    },
    { 
      id: 'sustainability', 
      label: 'Sustentabilidad', 
      description: '¿Qué tan difícil es para los competidores copiar esta ventaja?'
    },
    { 
      id: 'feasibility', 
      label: 'Factibilidad', 
      description: '¿Qué tan viable es desarrollar/mantener esta ventaja?'
    },
    { 
      id: 'urgency', 
      label: 'Urgencia', 
      description: '¿Qué tan urgente es desarrollar esta ventaja?'
    }
  ];

  // Datos de ejemplo de benchmarking (normalmente vendría de otra fuente)
  const sampleCompetitors = [
    { 
      name: 'Competidor A', 
      strengths: ['Precios bajos', 'Gran distribución'], 
      weaknesses: ['Calidad variable', 'Servicio limitado'],
      marketShare: 25
    },
    { 
      name: 'Competidor B', 
      strengths: ['Marca reconocida', 'Calidad premium'], 
      weaknesses: ['Precios altos', 'Poca innovación'],
      marketShare: 20
    },
    { 
      name: 'Competidor C', 
      strengths: ['Innovación', 'Tecnología avanzada'], 
      weaknesses: ['Precios elevados', 'Mercado limitado'],
      marketShare: 15
    }
  ];

  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdvantageSelection = (categoryId, advantageIndex, selected) => {
    setSelectedAdvantages(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [advantageIndex]: selected
      }
    }));
  };

  const handleAdvantageEvaluation = (categoryId, advantageIndex, criterion, score) => {
    setAdvantageEvaluations(prev => ({
      ...prev,
      [`${categoryId}-${advantageIndex}`]: {
        ...prev[`${categoryId}-${advantageIndex}`],
        [criterion]: score
      }
    }));
  };

  const getAdvantageScore = (categoryId, advantageIndex) => {
    const evaluation = advantageEvaluations[`${categoryId}-${advantageIndex}`];
    if (!evaluation) return 0;
    
    const scores = Object.values(evaluation);
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  };

  const getSelectedAdvantagesList = () => {
    const selected = [];
    advantageCategories.forEach(category => {
      if (selectedAdvantages[category.id]) {
        Object.entries(selectedAdvantages[category.id]).forEach(([index, isSelected]) => {
          if (isSelected) {
            const advantage = category.advantages[index];
            const score = getAdvantageScore(category.id, index);
            selected.push({
              category: category.title,
              categoryColor: category.color,
              advantage,
              score,
              priority: score >= 4 ? 'Alta' : score >= 3 ? 'Media' : 'Baja'
            });
          }
        });
      }
    });
    return selected.sort((a, b) => b.score - a.score);
  };

  const generateActionPlan = () => {
    const selectedAdvantages = getSelectedAdvantagesList();
    const highPriority = selectedAdvantages.filter(adv => adv.score >= 4);
    const mediumPriority = selectedAdvantages.filter(adv => adv.score >= 3 && adv.score < 4);
    
    return {
      immediate: highPriority.slice(0, 3),
      shortTerm: mediumPriority.slice(0, 3),
      longTerm: selectedAdvantages.filter(adv => adv.score < 3).slice(0, 2)
    };
  };

  return (
    <div className="competitive-advantage-container">
      <div className="header-section">
        <h1 className="page-title">
          <Trophy className="title-icon" />
          Análisis de Ventajas Competitivas
        </h1>
        <p className="page-description">
          Identifica, evalúa y desarrolla ventajas competitivas sustentables para tu negocio
        </p>
      </div>

      {/* Indicador de progreso */}
      <div className="progress-indicator">
        <div className="progress-steps">
          {[
            { step: 1, title: 'Información del Negocio', icon: Users },
            { step: 2, title: 'Análisis de Competidores', icon: Eye },
            { step: 3, title: 'Identificar Ventajas', icon: Target },
            { step: 4, title: 'Evaluar Ventajas', icon: BarChart3 },
            { step: 5, title: 'Plan de Acción', icon: TrendingUp }
          ].map(({ step, title, icon: Icon }) => (
            <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-circle">
                {currentStep > step ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              </div>
              <span className="step-title">{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Paso 1: Información del Negocio */}
      {currentStep === 1 && (
        <div className="step-content">
          <div className="business-info-section">
            <h2>Paso 1: Información de tu Negocio</h2>
            <p>Proporciona información básica sobre tu negocio para personalizar el análisis</p>

            <div className="business-form">
              <div className="form-group">
                <label htmlFor="business-name">Nombre del Negocio</label>
                <input
                  id="business-name"
                  type="text"
                  value={businessInfo.name}
                  onChange={(e) => handleBusinessInfoChange('name', e.target.value)}
                  placeholder="Ej: Mi Empresa Tech"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industria</label>
                <select
                  id="industry"
                  value={businessInfo.industry}
                  onChange={(e) => handleBusinessInfoChange('industry', e.target.value)}
                  className="form-select"
                >
                  <option value="">Selecciona tu industria</option>
                  <option value="technology">Tecnología</option>
                  <option value="retail">Retail/Comercio</option>
                  <option value="manufacturing">Manufactura</option>
                  <option value="services">Servicios</option>
                  <option value="finance">Finanzas</option>
                  <option value="healthcare">Salud</option>
                  <option value="education">Educación</option>
                  <option value="food">Alimentación</option>
                  <option value="construction">Construcción</option>
                  <option value="transportation">Transporte</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="target-market">Mercado Objetivo</label>
                <textarea
                  id="target-market"
                  value={businessInfo.targetMarket}
                  onChange={(e) => handleBusinessInfoChange('targetMarket', e.target.value)}
                  placeholder="Describe tu mercado objetivo principal..."
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-continue"
                onClick={() => setCurrentStep(2)}
                disabled={!businessInfo.name || !businessInfo.industry}
              >
                Continuar al Análisis
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 2: Análisis de Competidores */}
      {currentStep === 2 && (
        <div className="step-content">
          <div className="competitors-analysis-section">
            <h2>Paso 2: Análisis de la Competencia</h2>
            <p>Revisión de fortalezas y debilidades de tus principales competidores</p>

            <div className="benchmarking-notice">
              <div className="notice-icon">
                <Lightbulb size={24} />
              </div>
              <div className="notice-content">
                <h4>💡 Integración con Benchmarking</h4>
                <p>
                  Si ya realizaste un análisis de benchmarking, esos datos se integrarán automáticamente aquí. 
                  De lo contrario, puedes usar esta información de ejemplo para continuar.
                </p>
              </div>
            </div>

            <div className="competitors-grid">
              {sampleCompetitors.map((competitor, index) => (
                <div key={index} className="competitor-card">
                  <div className="competitor-header">
                    <h3>{competitor.name}</h3>
                    <span className="market-share">
                      {competitor.marketShare}% del mercado
                    </span>
                  </div>
                  
                  <div className="competitor-analysis">
                    <div className="strengths">
                      <h4>
                        <CheckCircle2 size={16} className="strength-icon" />
                        Fortalezas
                      </h4>
                      <ul>
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="weaknesses">
                      <h4>
                        <AlertTriangle size={16} className="weakness-icon" />
                        Debilidades
                      </h4>
                      <ul>
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="competitive-insights">
              <h3>📊 Insights Competitivos</h3>
              <div className="insights-grid">
                <div className="insight-card opportunity">
                  <Shield className="insight-icon" />
                  <h4>Oportunidades Identificadas</h4>
                  <ul>
                    <li>Servicio al cliente superior</li>
                    <li>Innovación en productos</li>
                    <li>Precios competitivos con calidad</li>
                  </ul>
                </div>
                <div className="insight-card threat">
                  <AlertTriangle className="insight-icon" />
                  <h4>Amenazas del Mercado</h4>
                  <ul>
                    <li>Competencia en precios</li>
                    <li>Marcas establecidas</li>
                    <li>Barreras de distribución</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={() => setCurrentStep(1)}
              >
                Anterior
              </button>
              <button 
                className="btn-continue"
                onClick={() => setCurrentStep(3)}
              >
                Identificar Ventajas
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 3: Identificar Ventajas */}
      {currentStep === 3 && (
        <div className="step-content">
          <div className="advantages-selection-section">
            <h2>Paso 3: Identificar Ventajas Competitivas Potenciales</h2>
            <p>Selecciona las ventajas que tu negocio tiene o podría desarrollar</p>

            <div className="selection-legend">
              <span className="legend-title">Instrucciones:</span>
              <p>Marca las ventajas competitivas que consideres relevantes para tu negocio. En el siguiente paso las evaluarás en detalle.</p>
            </div>

            <div className="advantages-categories">
              {advantageCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="advantage-category">
                    <div className={`category-header ${category.color}`}>
                      <Icon size={20} />
                      <div className="category-info">
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                      </div>
                    </div>
                    <div className="advantages-list">
                      {category.advantages.map((advantage, index) => (
                        <div key={index} className="advantage-item">
                          <label className="advantage-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedAdvantages[category.id]?.[index] || false}
                              onChange={(e) => handleAdvantageSelection(category.id, index, e.target.checked)}
                            />
                            <span className="checkmark"></span>
                            <span className="advantage-text">{advantage}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="selection-summary">
              <h3>Ventajas Seleccionadas: {
                Object.values(selectedAdvantages).reduce((total, category) => 
                  total + Object.values(category).filter(Boolean).length, 0
                )
              }</h3>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={() => setCurrentStep(2)}
              >
                Anterior
              </button>
              <button 
                className="btn-continue"
                onClick={() => setCurrentStep(4)}
                disabled={Object.keys(selectedAdvantages).length === 0}
              >
                Evaluar Ventajas
                <BarChart3 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 4: Evaluar Ventajas */}
      {currentStep === 4 && (
        <div className="step-content">
          <div className="advantages-evaluation-section">
            <h2>Paso 4: Evaluación de Ventajas Competitivas</h2>
            <p>Evalúa cada ventaja seleccionada según los criterios clave</p>

            <div className="evaluation-legend">
              <span className="legend-title">Escala de evaluación (1-5):</span>
              <div className="legend-items">
                <span className="legend-item">1 = Muy bajo</span>
                <span className="legend-item">2 = Bajo</span>
                <span className="legend-item">3 = Medio</span>
                <span className="legend-item">4 = Alto</span>
                <span className="legend-item">5 = Muy alto</span>
              </div>
            </div>

            <div className="evaluation-grid">
              {advantageCategories.map(category => {
                if (!selectedAdvantages[category.id]) return null;
                
                const selectedInCategory = Object.entries(selectedAdvantages[category.id])
                  .filter(([_, selected]) => selected);
                
                if (selectedInCategory.length === 0) return null;

                return (
                  <div key={category.id} className="category-evaluation">
                    <div className={`category-header-small ${category.color}`}>
                      <category.icon size={16} />
                      <span>{category.title}</span>
                    </div>
                    
                    {selectedInCategory.map(([index, _]) => (
                      <div key={index} className="advantage-evaluation">
                        <h4>{category.advantages[index]}</h4>
                        
                        <div className="criteria-evaluation">
                          {evaluationCriteria.map(criterion => (
                            <div key={criterion.id} className="criterion">
                              <div className="criterion-info">
                                <span className="criterion-label">{criterion.label}</span>
                                <span className="criterion-description">{criterion.description}</span>
                              </div>
                              <div className="rating-buttons">
                                {[1, 2, 3, 4, 5].map(score => (
                                  <button
                                    key={score}
                                    className={`rating-btn ${
                                      advantageEvaluations[`${category.id}-${index}`]?.[criterion.id] === score ? 'selected' : ''
                                    }`}
                                    onClick={() => handleAdvantageEvaluation(category.id, index, criterion.id, score)}
                                  >
                                    {score}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="advantage-score">
                          <span className="score-label">Puntuación promedio:</span>
                          <span className="score-value">
                            {getAdvantageScore(category.id, index).toFixed(1)}/5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={() => setCurrentStep(3)}
              >
                Anterior
              </button>
              <button 
                className="btn-continue"
                onClick={() => {
                  setCurrentStep(5);
                  setAnalysisComplete(true);
                }}
                disabled={Object.keys(advantageEvaluations).length === 0}
              >
                Ver Plan de Acción
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 5: Plan de Acción */}
      {currentStep === 5 && analysisComplete && (
        <div className="step-content">
          <div className="action-plan-section">
            <h2>Paso 5: Plan de Acción - Ventajas Competitivas</h2>
            <p>Estrategia priorizada para desarrollar y mantener tus ventajas competitivas</p>

            <div className="advantages-matrix">
              <h3>📊 Matriz de Ventajas Competitivas</h3>
              <div className="matrix-grid">
                {getSelectedAdvantagesList().map((advantage, index) => (
                  <div key={index} className={`advantage-matrix-item priority-${advantage.priority.toLowerCase()}`}>
                    <div className="advantage-info">
                      <h4>{advantage.advantage}</h4>
                      <span className={`category-badge ${advantage.categoryColor}`}>
                        {advantage.category}
                      </span>
                    </div>
                    <div className="advantage-metrics">
                      <span className="score">
                        {advantage.score.toFixed(1)}/5
                      </span>
                      <span className={`priority priority-${advantage.priority.toLowerCase()}`}>
                        {advantage.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-plan-timeline">
              <h3>🎯 Plan de Implementación</h3>
              
              {(() => {
                const actionPlan = generateActionPlan();
                return (
                  <div className="timeline-sections">
                    <div className="timeline-section immediate">
                      <h4>
                        <Zap className="timeline-icon" />
                        Acciones Inmediatas (0-3 meses)
                      </h4>
                      {actionPlan.immediate.length > 0 ? (
                        <ul>
                          {actionPlan.immediate.map((advantage, index) => (
                            <li key={index}>
                              <strong>{advantage.advantage}</strong>
                              <span className="priority-badge high">Prioridad Alta</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No hay ventajas de prioridad alta identificadas.</p>
                      )}
                    </div>

                    <div className="timeline-section short-term">
                      <h4>
                        <Target className="timeline-icon" />
                        Corto Plazo (3-6 meses)
                      </h4>
                      {actionPlan.shortTerm.length > 0 ? (
                        <ul>
                          {actionPlan.shortTerm.map((advantage, index) => (
                            <li key={index}>
                              <strong>{advantage.advantage}</strong>
                              <span className="priority-badge medium">Prioridad Media</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No hay ventajas de prioridad media identificadas.</p>
                      )}
                    </div>

                    <div className="timeline-section long-term">
                      <h4>
                        <TrendingUp className="timeline-icon" />
                        Largo Plazo (6+ meses)
                      </h4>
                      {actionPlan.longTerm.length > 0 ? (
                        <ul>
                          {actionPlan.longTerm.map((advantage, index) => (
                            <li key={index}>
                              <strong>{advantage.advantage}</strong>
                              <span className="priority-badge low">Desarrollo Futuro</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No hay ventajas para desarrollo a largo plazo.</p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="strategic-recommendations">
              <h3>💡 Recomendaciones Estratégicas</h3>
              <div className="recommendations-grid">
                <div className="recommendation-card focus">
                  <Award className="rec-icon" />
                  <div>
                    <strong>Enfoque Prioritario:</strong> Concéntrate en las 2-3 ventajas con mayor puntuación para maximizar el impacto.
                  </div>
                </div>
                <div className="recommendation-card sustainability">
                  <Shield className="rec-icon" />
                  <div>
                    <strong>Sustentabilidad:</strong> Desarrolla ventajas que sean difíciles de copiar por la competencia.
                  </div>
                </div>
                <div className="recommendation-card monitoring">
                  <BarChart3 className="rec-icon" />
                  <div>
                    <strong>Monitoreo Continuo:</strong> Revisa y actualiza tu análisis cada 6 meses para mantener la relevancia.
                  </div>
                </div>
                <div className="recommendation-card integration">
                  <Settings className="rec-icon" />
                  <div>
                    <strong>Integración Estratégica:</strong> Alinea el desarrollo de ventajas con tu plan estratégico general.
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={() => setCurrentStep(4)}
              >
                Anterior
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setCurrentStep(1);
                  setBusinessInfo({ name: '', industry: '', targetMarket: '' });
                  setSelectedAdvantages({});
                  setAdvantageEvaluations({});
                  setAnalysisComplete(false);
                }}
              >
                Nuevo Análisis
              </button>
              <button className="btn-export">
                Exportar Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitiveAdvantage;