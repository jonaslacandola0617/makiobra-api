const express = require('express');
const morgan = require('morgan');

const jobRouter = require('./routes/jobRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1/jobs', jobRouter);

module.exports = app;
