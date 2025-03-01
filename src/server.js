import 'dotenv/config';
import app from './index.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const PORT = process.env.PORT || 2323;

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
