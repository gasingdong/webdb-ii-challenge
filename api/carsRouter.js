const express = require('express');

const db = require('../data/db-config');

const router = express.Router();

router.use(express.json());

const validateCar = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: 'Request body is empty.' });
    return;
  }

  const { vin, make, model, mileage } = req.body;

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
    next();
  } else {
    res
      .status(400)
      .json({ error: 'Cars require a VIN, Make, Model, and Mileage.' });
  }
};

const validateCarId = async (req, res, next) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || !Number.isFinite(Number(id))) {
    res.status(400).json({ error: 'The id is not a valid number.' });
    return;
  }

  try {
    const car = await db('cars')
      .where({ id })
      .first();

    if (car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({ error: 'There is no car with this id.' });
    }
  } catch (err) {
    next(err);
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
    const { vin, make, model, mileage, transmission, status } = req.body;

    try {
      const newCar = {
        vin,
        make,
        model,
        mileage,
        transmission,
        status,
      };
      const [id] = await db('cars').insert(newCar);
      res.status(200).json({ id });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .all(validateCarId)
  .get((req, res) => {
    res.status(200).json(req.car);
  })
  .delete(async (req, res, next) => {
    const { id } = req.car;
    try {
      const deleted = await db('cars')
        .where({ id })
        .delete();

      if (deleted) {
        res.status(200).json(req.car);
      } else {
        throw new Error();
      }
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    const { vin, make, model, mileage, transmission, status } = req.body;
    const { car } = req;
    try {
      const updatedCar = {
        ...car,
        vin: vin || car.vin,
        make: make || car.make,
        model: model || car.model,
        mileage: mileage || car.mileage,
        transmission: transmission || car.transmission,
        status: status || car.status,
      };
      const updated = await db('cars')
        .where({ id: car.id })
        .update(updatedCar);

      if (updated) {
        res.status(200).json(updatedCar);
      } else {
        throw new Error();
      }
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
