import 'dotenv/config';
import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { getEnvVar } from './utils/getEnvVar.js';

const PORT = getEnvVar('PORT', 2323);

app.use(notFoundHandler);

app.use(errorHandler);

async function bootstrap() {
  try {
    await initMongoConnection();

    app.listen(PORT, () => {
      console.log(`Mongo connection successfully established!`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
