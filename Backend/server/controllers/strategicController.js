// Backend/controllers/strategicController.js
const { body, validationResult } = require('express-validator');

// Simulamos una base de datos en memoria para testing
let strategicData = {};

// Validation middleware functions
const validateProblemAnalysis = [
  body('businessPlanId')
    .notEmpty()
    .withMessage('ID del plan de negocio es requerido'),
  
  body('problemDefinition.mainFocus')
    .optional()
    .isLength({ min: 10, max: 2000 })
    .withMessage('El foco principal debe tener entre 10 y 2000 caracteres'),
  
  body('problemDefinition.centralHypothesis')
    .optional()
    .isLength({ min: 10, max: 2000 })
    .withMessage('La hipótesis central debe tener entre 10 y 2000 caracteres'),
  
  body('necessity.expectedResults')
    .optional()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Los resultados esperados deben tener entre 10 y 2000 caracteres'),
];

const strategicController = {
  // Problem Analysis Controllers
  async getProblemAnalysis(req, res) {
    try {
      const { businessPlanId } = req.params;
      
      const problemAnalysis = strategicData[`${businessPlanId}_problem_analysis`];

      if (!problemAnalysis) {
        return res.status(200).json(null); // Return null if not found
      }

      res.json(problemAnalysis);
    } catch (error) {
      console.error('Error getting problem analysis:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  async saveProblemAnalysis(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Datos de entrada inválidos',
          details: errors.array()
        });
      }

      const { businessPlanId, ...analysisData } = req.body;

      // Guardar en "base de datos" simulada
      const key = `${businessPlanId}_problem_analysis`;
      strategicData[key] = {
        businessPlanId,
        ...analysisData,
        updatedAt: new Date().toISOString(),
        createdAt: strategicData[key]?.createdAt || new Date().toISOString()
      };

      res.status(201).json({
        message: 'Análisis del problema guardado exitosamente',
        data: strategicData[key]
      });
    } catch (error) {
      console.error('Error saving problem analysis:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Generic Strategic Analysis Controller
  async getStrategicAnalysis(req, res) {
    try {
      const { analysisType, businessPlanId } = req.params;
      
      const analysis = strategicData[`${businessPlanId}_${analysisType.replace('-', '_')}`];

      if (!analysis) {
        return res.status(200).json(null);
      }

      res.json(analysis);
    } catch (error) {
      console.error(`Error getting ${req.params.analysisType}:`, error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  async saveStrategicAnalysis(req, res) {
    try {
      const { analysisType } = req.params;
      const { businessPlanId, ...analysisData } = req.body;

      const key = `${businessPlanId}_${analysisType.replace('-', '_')}`;
      strategicData[key] = {
        businessPlanId,
        analysisType: analysisType.replace('-', '_'),
        ...analysisData,
        updatedAt: new Date().toISOString(),
        createdAt: strategicData[key]?.createdAt || new Date().toISOString()
      };

      res.status(201).json({
        message: `${analysisType} guardado exitosamente`,
        data: strategicData[key]
      });
    } catch (error) {
      console.error(`Error saving ${req.params.analysisType}:`, error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get Strategic Progress
  async getStrategicProgress(req, res) {
    try {
      const { businessPlanId } = req.params;
      
      // Buscar todos los análisis para este business plan
      const allAnalyses = Object.keys(strategicData)
        .filter(key => key.startsWith(`${businessPlanId}_`))
        .map(key => strategicData[key]);

      const progress = {
        totalModules: 9, // Total strategic analysis modules
        completedModules: allAnalyses.length,
        modules: allAnalyses.reduce((acc, analysis) => {
          acc[analysis.analysisType] = {
            completed: true,
            completedAt: analysis.updatedAt
          };
          return acc;
        }, {}),
        completionPercentage: Math.round((allAnalyses.length / 9) * 100)
      };

      res.json(progress);
    } catch (error) {
      console.error('Error getting strategic progress:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Test endpoint
  async testEndpoint(req, res) {
    res.json({
      message: 'Strategic controller funcionando correctamente',
      timestamp: new Date().toISOString(),
      availableEndpoints: [
        'GET /api/strategic/problem-analysis/:businessPlanId',
        'POST /api/strategic/problem-analysis',
        'GET /api/strategic/progress/:businessPlanId'
      ]
    });
  }
};

module.exports = { 
  strategicController,
  validateProblemAnalysis
};