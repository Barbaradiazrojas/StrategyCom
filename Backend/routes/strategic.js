// Backend/routes/strategic.js
const express = require('express');
const router = express.Router();
const { strategicController, validateProblemAnalysis } = require('../controllers/strategicController');

// Test route
router.get('/test', strategicController.testEndpoint);

// Problem Analysis Routes
router.get('/problem-analysis/:businessPlanId', strategicController.getProblemAnalysis);
router.post('/problem-analysis', validateProblemAnalysis, strategicController.saveProblemAnalysis);

module.exports = router;
