import DatabaseAceessRepository from '@src/domain/repository/DatabaseAccessRepository';
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';
dotenv.config();

class DatabaseAceessRepositoryImpl implements DatabaseAceessRepository {
  connectToDb(databaseToken: string): void {
    mongoose.connect(databaseToken).then(() => console.log('Connected'));
  }
}

export default DatabaseAceessRepositoryImpl;
