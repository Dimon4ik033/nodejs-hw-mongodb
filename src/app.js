import path from 'node:path';

import express from 'express';
import routes from './routers/index.js';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const app = express();

app.use('/uploads', express.static(path.resolve('src', 'uploads')));
app.use('/api-docs', swaggerDocs());

app.use(cookieParser());
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
