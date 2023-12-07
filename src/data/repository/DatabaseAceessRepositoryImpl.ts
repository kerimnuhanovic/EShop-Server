import { DatabaseAceessRepository } from '@src/domain/repository/DatabaseAccessRepository';
import { injectable } from 'inversify';
import mongoose from 'mongoose';
import 'reflect-metadata';

@injectable()
export class DatabaseAceessRepositoryImpl implements DatabaseAceessRepository {
  connectToDb(databaseToken: string): void {
    mongoose.connect(databaseToken).then(() => console.log('Connected'));
  }
}
