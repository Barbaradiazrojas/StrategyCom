const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');
const auth = require('../middleware/auth');

router.get('/cashflow', auth, financialController.getCashFlow);
router.post('/revenue', auth, financialController.estimateRevenue);

module.exports = router;