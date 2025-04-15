import express from 'express';
import morgan from 'morgan';

import jobRouter from './routes/jobRoutes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.set('query parser', 'extended');
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/jobs', jobRouter);

export default app;
