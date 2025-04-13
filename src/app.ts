import express, { json } from 'express';

const app = express();

app.use(express.json());
app.set('query parser', 'extended');
app.use(express.urlencoded({ extended: true }));

export default app;
