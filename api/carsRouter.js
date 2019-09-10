const express = require('express');

const db = require('../data/db-config');

const router = express.Router();

router.use(express.json());

const validateCar = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'Request body is empty.' });
    return;
  }

  const { vin, make, model, mileage, transmission, status } = req.body;

  if (vin && make && model && mileage) {
    try {
      const car = await db('cars')
        .where({ vin })
        .first();

      if (car) {
        res.status(400).json({ error: 'Car VIN already exists.' });
        return;
      }
    } catch (err) {
      next(err);
    }

    req.car = {
      vin,
      make,
      model,
      mileage,
      transmission,
      status,
    };
    next();
  } else {
    res
      .status(400)
      .json({ error: 'Cars require a VIN, Make, Model, and Mileage.' });
  }
};

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const cars = await db('cars');
      res.status(200).json(cars);
    } catch (err) {
      next(err);
    }
  })
  .post(validateCar, async (req, res, next) => {
    const { car } = req;

    try {
      const [id] = await db('cars').insert(car);
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
    .json({ error: 'Error occurred while processing cars operation.' });
};

router.use(errorHandler);

module.exports = router;
