import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config/index.js';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL);
  const db = connection.connection.db as unknown as Db; // cast to MongoDB Db
  if (!db) throw new Error('MongoDB connection failed: db is undefined');
  return db;
};
