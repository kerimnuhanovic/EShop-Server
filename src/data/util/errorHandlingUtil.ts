import { Failure, Result, failure } from '@src/domain/util/Result';
import { serverError, userAlreadyExists } from '@src/strings/strings';
import { MongoError } from 'mongodb';
export const handleMongoError = (error: MongoError): Failure => {
  if (error.code === 11000) {
    return failure(userAlreadyExists, 409);
  }
  return failure(serverError, 500);
};
