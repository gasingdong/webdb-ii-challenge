const express = require('express');
const carsRouter = require('./carsRouter');
const salesRouter = require('./salesRouter');

const router = express.Router();

router.use('/cars', carsRouter);
router.use('/sales', salesRouter);

module.exports = router;
