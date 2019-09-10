const express = require('express');
const carsRouter = require('./carsRouter');

const router = express.Router();

router.use('/cars', carsRouter);

module.exports = router;
