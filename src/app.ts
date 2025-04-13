import express from 'express';
import jobRouter from './routes/jobRoutes';

const app = express();

app.use(express.json());
app.set('query parser', 'extended');
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/jobs', jobRouter);

export default app;
