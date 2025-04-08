import express from 'express';
import morgan from 'morgan';

import jobRouter from './routes/jobRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/jobs', jobRouter);

export default app;
