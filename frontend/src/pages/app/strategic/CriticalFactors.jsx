/* 
ARCHIVO: CriticalFactors.jsx
RUTA: C:\Users\user\Downloads\proyecto1_strategycom\frontend\src\pages\app\strategic\CriticalFactors.jsx
*/
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Lightbulb,
  Settings,
  Truck,
  Users,
  Star,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import './CriticalFactors.css';

const CriticalFactors = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [industryData, setIndustryData] = useState(null);
  const [criticalFactors, setCriticalFactors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Datos de industrias (extraídos de la información proporcionada)
  const industries = [
    { name: 'Publicidad', companies: 57, beta: 1.37, debtEquity: 33.76, taxRate: 5.44, unleveredBeta: 1.1 },
    { name: 'Aeroespacial/Defensa', companies: 70, beta: 1.08, debtEquity: 25.46, taxRate: 7.28, unleveredBeta: 0.90 },
    { name: 'Transporte aéreo', companies: 25, beta: 1.27, debtEquity: 162.15, taxRate: 8.62, unleveredBeta: 0.57 },
    { name: 'Autos y camiones', companies: 34, beta: 1.52, debtEquity: 31.02, taxRate: 3.12, unleveredBeta: 1.24 },
    { name: 'Bancos (regionales)', companies: 625, beta: 0.46, debtEquity: 101.95, taxRate: 17.69, unleveredBeta: 0.26 },
    { name: 'Bebidas (refrescantes)', companies: 29, beta: 0.76, debtEquity: 17.12, taxRate: 6.68, unleveredBeta: 0.68 },
    { name: 'Materiales de construcción', companies: 44, beta: 1.32, debtEquity: 18.15, taxRate: 19.94, unleveredBeta: 1.16 },
    { name: 'Servicios informáticos', companies: 72, beta: 1.0, debtEquity: 29.14, taxRate: 7.78, unleveredBeta: 0.82 },
    { name: 'Medicamentos (farmacéuticos)', companies: 245, beta: 1.03, debtEquity: 16.05, taxRate: 2.89, unleveredBeta: 0.92 },
    { name: 'Equipos eléctricos', companies: 103, beta: 1.24, debtEquity: 21.39, taxRate: 5.66, unleveredBeta: 1.07 },
    { name: 'Entretenimiento', companies: 98, beta: 0.99, debtEquity: 28.75, taxRate: 3.25, unleveredBeta: 0.82 },
    { name: 'Procesamiento de alimentos', companies: 82, beta: 0.61, debtEquity: 33.70, taxRate: 8.29, unleveredBeta: 0.48 },
    { name: 'Software (sistema y aplicación)', companies: 351, beta: 1.29, debtEquity: 6.20, taxRate: 4.19, unleveredBeta: 1.24 },
    { name: 'Telecomunicaciones (inalámbricas)', companies: 13, beta: 1.09, debtEquity: 64.16, taxRate: 9.56, unleveredBeta: 0.73 },
    { name: 'Venta al por menor (general)', companies: 26, beta: 1.25, debtEquity: 13.42, taxRate: 14.58, unleveredBeta: 1.13 }
  ];

  // Factores críticos de éxito categorizados
  const criticalFactorCategories = [
    {
      id: 'technology',
      title: 'Relacionados con la tecnología',
      icon: Lightbulb,
      color: 'blue',
      factors: [
        'Experiencia en la investigación científica',
        'Capacidad de innovación en el servicio',
        'Capacidad de innovación en los productos',
        'Experiencia en una Tecnología'
      ]
    },
    {
      id: 'manufacturing',
      title: 'Relacionados con la fabricación',
      icon: Settings,
      color: 'green',
      factors: [
        'Eficiencia de producción de bajo costo (economías de escala)',
        'Calidad de fabricación (menos defectos)',
        'Gran utilización de los activos fijos',
        'Ubicaciones de plantas de bajo costo',
        'Acceso a mano de obra especializada',
        'Alta productividad de la mano de obra',
        'Diseño e ingeniería de productos de bajo costo',
        'Flexibilidad para fabricar una gama de modelos'
      ]
    },
    {
      id: 'distribution',
      title: 'Relacionados con la distribución',
      icon: Truck,
      color: 'purple',
      factors: [
        'Una sólida red de distribuidores/comerciantes mayoristas',
        'Obtención de un mayor espacio en los estantes de minoristas',
        'Establecimientos detallistas pertenecientes a la Compañía',
        'Bajos costos de distribución',
        'Entrega rápida'
      ]
    },
    {
      id: 'marketing',
      title: 'Relacionados con marketing',
      icon: Target,
      color: 'orange',
      factors: [
        'Una fuerza de ventas eficaz y bien capacitada',
        'Servicio confiable y asistencia técnica disponible',
        'Exactitud en el surtido de los pedidos de los compradores',
        'Variedad de la línea de productos y selección',
        'Habilidades comerciales',
        'Estilos y envases atractivos',
        'Garantías para los clientes'
      ]
    },
    {
      id: 'skills',
      title: 'Relacionados con habilidades',
      icon: Users,
      color: 'red',
      factors: [
        'Talento superior (importante en los servicios profesionales)',
        'Conocimiento del control de calidad',
        'Experiencia en diseños',
        'Experiencia en una tecnología en particular',
        'Capacidad de producir anuncios inteligentes y atractivos',
        'Capacidad de sacar productos recién desarrollados al mercado'
      ]
    },
    {
      id: 'organization',
      title: 'Capacidad de la organización',
      icon: BarChart3,
      color: 'indigo',
      factors: [
        'Sistemas superiores de información',
        'Capacidad de responder con rapidez a las cambiantes condiciones',
        'Más experiencia y conocimiento gerencial'
      ]
    },
    {
      id: 'others',
      title: 'Otros tipos de factores clave de éxito',
      icon: Star,
      color: 'pink',
      factors: [
        'Imagen/reputación favorable con los compradores',
        'Costos generales bajos',
        'Ubicaciones convenientes',
        'Empleados agradables y corteses',
        'Acceso a capital financiero',
        'Protección de las patentes'
      ]
    }
  ];

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry.name);
    setIndustryData(industry);
    setCurrentStep(2);
  };

  const handleFactorEvaluation = (categoryId, factorIndex, score) => {
    setCriticalFactors(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [factorIndex]: score
      }
    }));
  };

  const getRiskLevel = (beta) => {
    if (beta < 0.8) return { level: 'Bajo', color: 'green' };
    if (beta < 1.2) return { level: 'Medio', color: 'yellow' };
    return { level: 'Alto', color: 'red' };
  };

  const generateAnalysis = () => {
    setCurrentStep(4);
    setAnalysisComplete(true);
  };

  const getAnalysisInsights = () => {
    if (!industryData) return [];

    const risk = getRiskLevel(industryData.beta);
    const insights = [];

    // Análisis de Beta
    insights.push({
      type: 'risk',
      title: 'Análisis de Riesgo Sistemático',
      content: `La industria ${selectedIndustry} presenta un beta de ${industryData.beta}, indicando un riesgo ${risk.level.toLowerCase()}. ${
        risk.level === 'Alto' 
          ? 'Esta industria es más volátil que el mercado general, lo que implica mayor sensibilidad a cambios económicos.'
          : risk.level === 'Bajo'
          ? 'Esta industria es menos volátil que el mercado general, ofreciendo mayor estabilidad.'
          : 'Esta industria tiene una volatilidad similar al mercado general.'
      }`
    });

    // Análisis de Apalancamiento
    insights.push({
      type: 'leverage',
      title: 'Estructura de Capital',
      content: `Con una relación D/E de ${industryData.debtEquity}%, ${
        industryData.debtEquity > 50 
          ? 'la industria presenta un alto nivel de apalancamiento, lo que puede amplificar tanto los beneficios como los riesgos.'
          : 'la industria mantiene un nivel de apalancamiento conservador, sugiriendo una estructura financiera más estable.'
      }`
    });

    // Análisis de Competencia
    insights.push({
      type: 'competition',
      title: 'Intensidad Competitiva',
      content: `La industria cuenta con ${industryData.companies} empresas, ${
        industryData.companies > 100 
          ? 'indicando un mercado altamente fragmentado y competitivo.'
          : industryData.companies > 50
          ? 'sugiriendo un nivel moderado de competencia.'
          : 'indicando un mercado concentrado con pocos competidores principales.'
      }`
    });

    return insights;
  };

  return (
    <div className="critical-factors-container">
      <div className="header-section">
        <h1 className="page-title">
          <Target className="title-icon" />
          Análisis de Factores Críticos de la Industria
        </h1>
        <p className="page-description">
          Identifica y evalúa los factores críticos de éxito para tu industria
        </p>
      </div>

      {/* Indicador de progreso */}
      <div className="progress-indicator">
        <div className="progress-steps">
          {[
            { step: 1, title: 'Seleccionar Industria', icon: Search },
            { step: 2, title: 'Datos Financieros', icon: BarChart3 },
            { step: 3, title: 'Evaluar Factores', icon: Target },
            { step: 4, title: 'Análisis', icon: TrendingUp }
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

      {/* Paso 1: Selección de Industria */}
      {currentStep === 1 && (
        <div className="step-content">
          <div className="industry-selection">
            <h2>Paso 1: Selecciona tu Industria</h2>
            <p>Elige la industria que mejor represente tu negocio para obtener datos específicos del sector</p>
            
            <div className="industries-grid">
              {industries.map((industry, index) => (
                <div 
                  key={index} 
                  className="industry-card"
                  onClick={() => handleIndustrySelect(industry)}
                >
                  <div className="industry-info">
                    <h3>{industry.name}</h3>
                    <div className="industry-stats">
                      <span className="stat">
                        <strong>{industry.companies}</strong> empresas
                      </span>
                      <span className="stat">
                        Beta: <strong>{industry.beta}</strong>
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="arrow-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paso 2: Datos Financieros */}
      {currentStep === 2 && industryData && (
        <div className="step-content">
          <div className="industry-data-section">
            <h2>Paso 2: Datos Financieros de {selectedIndustry}</h2>
            <p>Análisis de los indicadores financieros clave de tu industria</p>

            <div className="financial-metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <TrendingUp className="metric-icon beta" />
                  <span className="metric-label">Beta (β)</span>
                </div>
                <div className="metric-value">{industryData.beta}</div>
                <div className={`risk-indicator ${getRiskLevel(industryData.beta).color}`}>
                  Riesgo {getRiskLevel(industryData.beta).level}
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <BarChart3 className="metric-icon debt" />
                  <span className="metric-label">Relación D/E</span>
                </div>
                <div className="metric-value">{industryData.debtEquity}%</div>
                <div className="metric-description">Deuda/Patrimonio</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Target className="metric-icon tax" />
                  <span className="metric-label">Tasa Impositiva</span>
                </div>
                <div className="metric-value">{industryData.taxRate}%</div>
                <div className="metric-description">Tasa efectiva</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Users className="metric-icon companies" />
                  <span className="metric-label">Empresas</span>
                </div>
                <div className="metric-value">{industryData.companies}</div>
                <div className="metric-description">En el sector</div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <AlertCircle className="metric-icon unlevered" />
                  <span className="metric-label">Beta sin Apalancamiento</span>
                </div>
                <div className="metric-value">{industryData.unleveredBeta}</div>
                <div className="metric-description">Beta puro</div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-continue"
                onClick={() => setCurrentStep(3)}
              >
                Continuar con Factores Críticos
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 3: Evaluación de Factores Críticos */}
      {currentStep === 3 && (
        <div className="step-content">
          <div className="factors-evaluation-section">
            <h2>Paso 3: Evaluación de Factores Críticos</h2>
            <p>Evalúa la importancia de cada factor para el éxito en tu industria</p>

            <div className="evaluation-legend">
              <span className="legend-title">Escala de evaluación:</span>
              <div className="legend-items">
                <span className="legend-item">0 = Ninguna importancia</span>
                <span className="legend-item">1 = Algo importante</span>
                <span className="legend-item">2 = Importante</span>
                <span className="legend-item">3 = Muy importante</span>
                <span className="legend-item">4 = Crítico</span>
              </div>
            </div>

            <div className="factors-categories">
              {criticalFactorCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="factor-category">
                    <div className={`category-header ${category.color}`}>
                      <Icon size={20} />
                      <h3>{category.title}</h3>
                    </div>
                    <div className="factors-list">
                      {category.factors.map((factor, index) => (
                        <div key={index} className="factor-item">
                          <span className="factor-text">{factor}</span>
                          <div className="rating-buttons">
                            {[0, 1, 2, 3, 4].map(score => (
                              <button
                                key={score}
                                className={`rating-btn ${
                                  criticalFactors[category.id]?.[index] === score ? 'selected' : ''
                                }`}
                                onClick={() => handleFactorEvaluation(category.id, index, score)}
                              >
                                {score}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="action-buttons">
              <button 
                className="btn-continue"
                onClick={generateAnalysis}
                disabled={Object.keys(criticalFactors).length === 0}
              >
                Generar Análisis
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paso 4: Análisis y Resultados */}
      {currentStep === 4 && analysisComplete && (
        <div className="step-content">
          <div className="analysis-section">
            <h2>Paso 4: Análisis de Factores Críticos - {selectedIndustry}</h2>
            <p>Interpretación de los datos y recomendaciones estratégicas</p>

            <div className="analysis-insights">
              {getAnalysisInsights().map((insight, index) => (
                <div key={index} className={`insight-card ${insight.type}`}>
                  <h4>{insight.title}</h4>
                  <p>{insight.content}</p>
                </div>
              ))}
            </div>

            <div className="critical-factors-summary">
              <h3>Resumen de Factores Críticos Evaluados</h3>
              {Object.keys(criticalFactors).length > 0 ? (
                <div className="factors-summary-grid">
                  {criticalFactorCategories.map(category => {
                    if (!criticalFactors[category.id]) return null;
                    
                    const categoryScores = Object.values(criticalFactors[category.id]);
                    const avgScore = categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length;
                    
                    return (
                      <div key={category.id} className="category-summary">
                        <div className={`category-header-small ${category.color}`}>
                          <category.icon size={16} />
                          <span>{category.title}</span>
                        </div>
                        <div className="category-score">
                          <span className="score-value">{avgScore.toFixed(1)}</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill"
                              style={{ width: `${(avgScore / 4) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No se han evaluado factores críticos aún.</p>
              )}
            </div>

            <div className="strategic-recommendations">
              <h3>Recomendaciones Estratégicas</h3>
              <div className="recommendations-list">
                <div className="recommendation">
                  <CheckCircle2 className="rec-icon" />
                  <div>
                    <strong>Gestión de Riesgo:</strong>
                    {getRiskLevel(industryData.beta).level === 'Alto' 
                      ? ' Implementar estrategias de diversificación y cobertura para mitigar la alta volatilidad.'
                      : getRiskLevel(industryData.beta).level === 'Bajo'
                      ? ' Aprovechar la estabilidad del sector para inversiones a largo plazo.'
                      : ' Mantener un equilibrio entre crecimiento y estabilidad.'
                    }
                  </div>
                </div>
                <div className="recommendation">
                  <CheckCircle2 className="rec-icon" />
                  <div>
                    <strong>Estructura de Capital:</strong>
                    {industryData.debtEquity > 50
                      ? ' Evaluar oportunidades de optimización del apalancamiento y gestión de la deuda.'
                      : ' Considerar un mayor apalancamiento estratégico para financiar crecimiento.'
                    }
                  </div>
                </div>
                <div className="recommendation">
                  <CheckCircle2 className="rec-icon" />
                  <div>
                    <strong>Ventaja Competitiva:</strong> Enfocar recursos en los factores críticos con mayor puntuación para desarrollar ventajas competitivas sostenibles.
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-primary"
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedIndustry('');
                  setIndustryData(null);
                  setCriticalFactors({});
                  setAnalysisComplete(false);
                }}
              >
                Nuevo Análisis
              </button>
              <button className="btn-export">
                Exportar Análisis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalFactors;