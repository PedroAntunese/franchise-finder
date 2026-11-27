import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import naoEncontrada from './middlewares/naoEncontrada.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(naoEncontrada);
app.use(errorHandler); // sempre por último

export default app;
