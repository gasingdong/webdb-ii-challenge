const express = require('express');
const apiRouter = require('./apiRouter');

const server = express();

server.use('/api', apiRouter);

module.exports = server;
