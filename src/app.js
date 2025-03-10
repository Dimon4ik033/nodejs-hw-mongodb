import express from 'express';
import routes from './routers/index.js';
import pino from 'pino-http';
import cors from 'cors';

const app = express();

app.use(routes);

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());

export default app;
