const express = require('express');

const db = require('../data/db-config');

const router = express.Router();

router.use(express.json());

router.route('/').get(async (req, res, next) => {
  try {
    const sales = await db('sales');
    res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
});

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  console.log(err);
  res
    .status(500)
    .json({ error: 'Error occurred while processing sales operation.' });
};

router.use(errorHandler);

module.exports = router;
