// frontend/src/pages/app/strategic/ProblemAnalysis.jsx
import React, { useState, useEffect } from 'react';
import './ProblemAnalysis.css';
import { 
  AlertCircle, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle, 
  Info,
  Save,
  ArrowRight,
  Book,
  Users,
  Zap
} from 'lucide-react';
import { useBusinessPlan } from '../../../hooks/useBusinessPlan';
import './ProblemAnalysis.css';
import { strategicService } from '../../../services/businessPlanService';


const ProblemAnalysis = () => {
  const { businessPlan, updateBusinessPlan } = useBusinessPlan();
  const [formData, setFormData] = useState({
    problemDefinition: {
      mainFocus: '',
      centralHypothesis: '',
      supportingStudies: [{ author: '', studyName: '', year: '', relevance: '' }]
    },
    necessity: {
      expectedResults: '',
      similarSolutions: '',
      differentiation: '',
      proposalClarity: ''
    },
    opportunity: {
      needSegmentRelation: '',
      targetSegment: '',
      marketTiming: '',
      competitiveGap: ''
    },
    innovativeSolution: {
      proposalDescription: '',
      currentTrendsAlignment: '',
      environmentalAnalysis: '',
      innovationLevel: '',
      implementationFeasibility: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar datos existentes al montar el componente
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      if (businessPlan?.id) {
        const existingData = await strategicService.getProblemAnalysis(businessPlan.id);
        if (existingData) {
          setFormData(existingData);
          // Marcar pasos completados basado en datos existentes
          markCompletedSteps(existingData);
        }
      }
    } catch (error) {
      console.error('Error cargando datos existentes:', error);
    }
  };

  const markCompletedSteps = (data) => {
    const completed = new Set();
    if (data.problemDefinition?.mainFocus) completed.add(0);
    if (data.necessity?.expectedResults) completed.add(1);
    if (data.opportunity?.needSegmentRelation) completed.add(2);
    if (data.innovativeSolution?.proposalDescription) completed.add(3);
    setCompletedSteps(completed);
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== null && Array.isArray(newData[section][field])) {
        newData[section][field][index] = { ...newData[section][field][index], ...value };
      } else {
        newData[section] = {
          ...newData[section],
          [field]: value
        };
      }
      
      return newData;
    });

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const addSupportingStudy = () => {
    setFormData(prev => ({
      ...prev,
      problemDefinition: {
        ...prev.problemDefinition,
        supportingStudies: [
          ...prev.problemDefinition.supportingStudies,
          { author: '', studyName: '', year: '', relevance: '' }
        ]
      }
    }));
  };

  const removeSupportingStudy = (index) => {
    setFormData(prev => ({
      ...prev,
      problemDefinition: {
        ...prev.problemDefinition,
        supportingStudies: prev.problemDefinition.supportingStudies.filter((_, i) => i !== index)
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Problem Definition
        if (!formData.problemDefinition.mainFocus.trim()) {
          newErrors['problemDefinition.mainFocus'] = 'El foco principal es requerido';
        }
        if (!formData.problemDefinition.centralHypothesis.trim()) {
          newErrors['problemDefinition.centralHypothesis'] = 'La hipótesis central es requerida';
        }
        break;
      case 1: // Necessity
        if (!formData.necessity.expectedResults.trim()) {
          newErrors['necessity.expectedResults'] = 'Los resultados esperados son requeridos';
        }
        break;
      case 2: // Opportunity
        if (!formData.opportunity.needSegmentRelation.trim()) {
          newErrors['opportunity.needSegmentRelation'] = 'La relación necesidad-segmento es requerida';
        }
        break;
      case 3: // Innovative Solution
        if (!formData.innovativeSolution.proposalDescription.trim()) {
          newErrors['innovativeSolution.proposalDescription'] = 'La descripción de la propuesta es requerida';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataToSave = {
        businessPlanId: businessPlan.id,
        ...formData,
        completedAt: completedSteps.size === 4 ? new Date().toISOString() : null
      };

      await strategicService.saveProblemAnalysis(dataToSave);
      await updateBusinessPlan();
      
      // Mostrar mensaje de éxito
      alert('Análisis del problema guardado exitosamente');
    } catch (error) {
      console.error('Error guardando análisis:', error);
      alert('Error al guardar. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      title: 'Definir Problema',
      icon: AlertCircle,
      color: 'red',
      description: 'Establece el foco principal y la hipótesis central'
    },
    {
      title: 'Necesidad',
      icon: Target,
      color: 'blue',
      description: 'Identifica resultados esperados y diferenciación'
    },
    {
      title: 'Oportunidad',
      icon: TrendingUp,
      color: 'green',
      description: 'Analiza la relación entre necesidad, segmento y propuesta'
    },
    {
      title: 'Solución Innovadora',
      icon: Lightbulb,
      color: 'purple',
      description: 'Desarrolla una propuesta actualizada y fundamentada'
    }
  ];

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">Guía para definir el problema</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Escoge un foco principal donde expongas el problema más relevante. Define cuál es la hipótesis central 
                    que generará tres definiciones validadas por estudios y datos relevantes.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foco Principal del Problema *
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['problemDefinition.mainFocus'] ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
                placeholder="Describe cuál es el problema más relevante que tu emprendimiento busca resolver..."
                value={formData.problemDefinition.mainFocus}
                onChange={(e) => handleInputChange('problemDefinition', 'mainFocus', e.target.value)}
              />
              {errors['problemDefinition.mainFocus'] && (
                <p className="text-red-500 text-sm mt-1">{errors['problemDefinition.mainFocus']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hipótesis Central *
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['problemDefinition.centralHypothesis'] ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
                placeholder="Plantea la hipótesis central que sustenta tu identificación del problema..."
                value={formData.problemDefinition.centralHypothesis}
                onChange={(e) => handleInputChange('problemDefinition', 'centralHypothesis', e.target.value)}
              />
              {errors['problemDefinition.centralHypothesis'] && (
                <p className="text-red-500 text-sm mt-1">{errors['problemDefinition.centralHypothesis']}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Estudios y Datos de Respaldo
                </label>
                <button
                  type="button"
                  onClick={addSupportingStudy}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Agregar Estudio
                </button>
              </div>

              {formData.problemDefinition.supportingStudies.map((study, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Autor"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={study.author}
                      onChange={(e) => handleInputChange('problemDefinition', 'supportingStudies', { author: e.target.value }, index)}
                    />
                    <input
                      type="text"
                      placeholder="Nombre del Estudio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={study.studyName}
                      onChange={(e) => handleInputChange('problemDefinition', 'supportingStudies', { studyName: e.target.value }, index)}
                    />
                    <input
                      type="text"
                      placeholder="Año"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={study.year}
                      onChange={(e) => handleInputChange('problemDefinition', 'supportingStudies', { year: e.target.value }, index)}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Relevancia"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={study.relevance}
                        onChange={(e) => handleInputChange('problemDefinition', 'supportingStudies', { relevance: e.target.value }, index)}
                      />
                      {formData.problemDefinition.supportingStudies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSupportingStudy(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <Target className="h-5 w-5 text-green-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-green-800">Definir la Necesidad</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Obtén resultados que satisfagan el problema. Investiga soluciones similares y define la diferenciación 
                    para generar claridad en tu propuesta.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resultados Esperados *
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['necessity.expectedResults'] ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
                placeholder="Describe qué resultados esperas obtener que satisfagan el problema identificado..."
                value={formData.necessity.expectedResults}
                onChange={(e) => handleInputChange('necessity', 'expectedResults', e.target.value)}
              />
              {errors['necessity.expectedResults'] && (
                <p className="text-red-500 text-sm mt-1">{errors['necessity.expectedResults']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soluciones Similares Existentes
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Investiga y describe soluciones que se hayan presentado de manera similar a este problema..."
                value={formData.necessity.similarSolutions}
                onChange={(e) => handleInputChange('necessity', 'similarSolutions', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diferenciación de tu Propuesta
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Define con detalle la diferenciación de tu propuesta respecto a las soluciones existentes..."
                value={formData.necessity.differentiation}
                onChange={(e) => handleInputChange('necessity', 'differentiation', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claridad en la Propuesta
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Resume de manera clara y concisa cuál es tu propuesta de valor..."
                value={formData.necessity.proposalClarity}
                onChange={(e) => handleInputChange('necessity', 'proposalClarity', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <TrendingUp className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-800">Identificar la Oportunidad</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    La oportunidad es la relación entre la necesidad, el segmento objetivo y la propuesta presentada por tu proyecto.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relación Necesidad-Segmento-Propuesta *
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['opportunity.needSegmentRelation'] ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
                placeholder="Explica cómo se relaciona la necesidad identificada con tu segmento objetivo y tu propuesta..."
                value={formData.opportunity.needSegmentRelation}
                onChange={(e) => handleInputChange('opportunity', 'needSegmentRelation', e.target.value)}
              />
              {errors['opportunity.needSegmentRelation'] && (
                <p className="text-red-500 text-sm mt-1">{errors['opportunity.needSegmentRelation']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Segmento Objetivo
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Define claramente cuál es tu segmento objetivo y sus características..."
                value={formData.opportunity.targetSegment}
                onChange={(e) => handleInputChange('opportunity', 'targetSegment', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Momento del Mercado
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Analiza por qué este es el momento adecuado para tu propuesta en el mercado..."
                value={formData.opportunity.marketTiming}
                onChange={(e) => handleInputChange('opportunity', 'marketTiming', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brecha Competitiva
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Identifica qué brecha en el mercado vas a cubrir que la competencia no está atendiendo..."
                value={formData.opportunity.competitiveGap}
                onChange={(e) => handleInputChange('opportunity', 'competitiveGap', e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <div className="flex">
                <Lightbulb className="h-5 w-5 text-purple-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-purple-800">Propuesta de Solución Innovadora</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Desarrolla una propuesta actualizada a los tiempos actuales, respaldada por un estudio y análisis del entorno.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción de la Propuesta *
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['innovativeSolution.proposalDescription'] ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
                placeholder="Describe detalladamente tu propuesta de solución innovadora..."
                value={formData.innovativeSolution.proposalDescription}
                onChange={(e) => handleInputChange('innovativeSolution', 'proposalDescription', e.target.value)}
              />
              {errors['innovativeSolution.proposalDescription'] && (
                <p className="text-red-500 text-sm mt-1">{errors['innovativeSolution.proposalDescription']}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alineación con Tendencias Actuales
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Explica cómo tu propuesta se alinea con las tendencias y necesidades actuales del mercado..."
                value={formData.innovativeSolution.currentTrendsAlignment}
                onChange={(e) => handleInputChange('innovativeSolution', 'currentTrendsAlignment', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Análisis del Entorno
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Realiza un análisis del entorno que sustenta la viabilidad de tu propuesta..."
                value={formData.innovativeSolution.environmentalAnalysis}
                onChange={(e) => handleInputChange('innovativeSolution', 'environmentalAnalysis', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de Innovación
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.innovativeSolution.innovationLevel}
                  onChange={(e) => handleInputChange('innovativeSolution', 'innovationLevel', e.target.value)}
                >
                  <option value="">Selecciona...</option>
                  <option value="incremental">Incremental</option>
                  <option value="sustancial">Sustancial</option>
                  <option value="radical">Radical</option>
                  <option value="disruptiva">Disruptiva</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Factibilidad de Implementación
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.innovativeSolution.implementationFeasibility}
                  onChange={(e) => handleInputChange('innovativeSolution', 'implementationFeasibility', e.target.value)}
                >
                  <option value="">Selecciona...</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="problem-analysis-container">
      {/* Header */}
      <div className="problem-analysis-header">
        <div className="header-content">
          <div className="p-2 bg-blue-100 rounded-lg">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análisis del Problema</h1>
            <p className="text-gray-600 mt-1">Define y estructura el problema fundamental de tu emprendimiento</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.has(index);
            const isCurrent = currentStep === index;
            
            return (
              <React.Fragment key={index}>
                <div 
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    isCurrent 
                      ? `bg-${step.color}-50 border-2 border-${step.color}-200` 
                      : isCompleted 
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`p-2 rounded-lg ${
                    isCompleted 
                      ? 'bg-green-100' 
                      : `bg-${step.color}-100`
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Icon className={`h-5 w-5 text-${step.color}-600`} />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <h3 className={`font-medium ${
                      isCurrent ? `text-${step.color}-900` : isCompleted ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 hidden lg:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Form Content */}
        <div className="form-content">
          <div className="form-container">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>

            {getStepContent()}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="btn btn-secondary"
              >
                Anterior
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="btn btn-gray"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="btn btn-primary"
                  >
                    Siguiente
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (validateStep(currentStep)) {
                        setCompletedSteps(prev => new Set([...prev, currentStep]));
                        handleSave();
                      }
                    }}
                    className="btn btn-success"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Completar Análisis
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with Guide */}
        <div className="sidebar">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Book className="h-5 w-5 text-blue-600" />
              Guía de Ayuda
            </h3>

            <div className="space-y-4">
              {/* Current Step Guide */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">
                  {steps[currentStep].title}
                </h4>
                <p className="text-sm text-blue-800">
                  {currentStep === 0 && "Define claramente el problema principal que tu emprendimiento resolverá. Asegúrate de que sea específico y medible."}
                  {currentStep === 1 && "Identifica qué necesidades específicas satisfará tu solución y cómo se diferencia de lo que ya existe en el mercado."}
                  {currentStep === 2 && "Analiza cómo tu propuesta conecta con el segmento objetivo y por qué representa una oportunidad real de negocio."}
                  {currentStep === 3 && "Desarrolla una propuesta innovadora que esté alineada con las tendencias actuales y sea factible de implementar."}
                </p>
              </div>

              {/* Tips */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Tips Importantes
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Usa datos concretos y estudios para respaldar tus afirmaciones
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Se específico en lugar de usar términos generales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Considera el contexto actual del mercado
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Valida tus hipótesis con evidencia real
                  </li>
                </ul>
              </div>

              {/* Progress Summary */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  Progreso
                </h4>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {completedSteps.has(index) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : index === currentStep ? (
                        <div className="h-4 w-4 border-2 border-blue-500 rounded-full animate-pulse" />
                      ) : (
                        <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className={completedSteps.has(index) ? 'text-green-700' : 'text-gray-600'}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Completado</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {completedSteps.size} de {steps.length} pasos
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Acciones Rápidas</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1">
                    📊 Ver ejemplos de análisis
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1">
                    📋 Descargar plantilla
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1">
                    💡 Solicitar asesoría
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal would go here */}
      {completedSteps.size === 4 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ¡Análisis del Problema Completado!
              </h3>
              <p className="text-gray-600 mb-6">
                Has definido exitosamente el problema fundamental de tu emprendimiento. 
                Ahora puedes continuar con el siguiente módulo del análisis estratégico.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.href = '/app/strategic/canvas-method'}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Siguiente Módulo
                </button>
                <button
                  onClick={() => setCompletedSteps(new Set([...completedSteps]))}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Revisar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemAnalysis;



