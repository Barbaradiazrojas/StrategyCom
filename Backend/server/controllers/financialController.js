const Financial = require('../models/Financial');

exports.estimateRevenue = async (req, res) => {
  try {
    const { planId, data } = req.body;
    const revenue = await Financial.calculateRevenue(planId, data);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};