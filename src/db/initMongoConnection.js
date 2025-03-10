import mongoos from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

const DB_URL = getEnvVar('DB_URL');

export function initMongoConnection() {
  return mongoos.connect(DB_URL);
}
