import mongoos from 'mongoose';

const DB_URL = process.env.DB_URL;

export function initMongoConnection() {
  return mongoos.connect(DB_URL);
}
