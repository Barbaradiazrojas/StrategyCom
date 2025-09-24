// Backend/controllers/strategicController.js
const { body, validationResult } = require('express-validator');

// Simulamos una base de datos en memoria para testing
let strategicData = {};

// Validation middleware functions
const validateProblemAnalysis = [
  body('businessPlanId')
    .notEmpty()
    .withMessage('ID del plan de negocio es requerido'),
];

const strategicController = {
  async getProblemAnalysis(req, res) {
    try {
      const { businessPlanId } = req.params;
      const problemAnalysis = strategicData[${businessPlanId}_problem_analysis];
      res.json(problemAnalysis || null);
    } catch (error) {
      console.error('Error getting problem analysis:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async saveProblemAnalysis(req, res) {
    try {
      const { businessPlanId, ...analysisData } = req.body;
      const key = ${businessPlanId}_problem_analysis;
      strategicData[key] = {
        businessPlanId,
        ...analysisData,
        updatedAt: new Date().toISOString()
      };
      res.status(201).json({
        message: 'Análisis guardado exitosamente',
        data: strategicData[key]
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async testEndpoint(req, res) {
    res.json({
      message: 'Strategic controller funcionando correctamente',
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = { strategicController, validateProblemAnalysis };
