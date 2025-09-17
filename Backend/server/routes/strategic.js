// server/routes/strategic.js
router.put('/:planId/strategic', auth, validateProblemAnalysis, updateStrategicAnalysis);
