const express = require('express');

const db = require('../data/db-config');

const router = express.Router();

router.use(express.json());

const validateSale = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'Request body is empty.' });
    return;
  }

  // eslint-disable-next-line camelcase
  const { car_id, amount } = req.body;

  // eslint-disable-next-line camelcase
  if (car_id && amount) {
    next();
  } else {
    res
      .status(400)
      .json({ error: 'Sales require a car ID and a sale amount.' });
  }
};

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const sales = await db('sales');
      res.status(200).json(sales);
    } catch (err) {
      next(err);
    }
  })
  .post(validateSale, async (req, res, next) => {
    // eslint-disable-next-line camelcase
    const { car_id, amount, date } = req.body;

    try {
      const newSale = {
        car_id,
        amount,
        date,
      };
      const [id] = await db('sales').insert(newSale);
      res.status(200).json({ id });
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
