import { User } from '@src/domain/model/User';
import { UserRepository } from '@src/domain/repository/UserRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { UserDao } from '@src/data/dao/UserDao';
import { userDocumentToUser, userDocumentToUserResponse } from '../mapper/UserMapper';
import mongoose, { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { Result, failure, success } from '@src/domain/util/Result';
import { handleMongoError } from '../util/errorHandlingUtil';
import { serverError } from '@src/strings/strings';
import { UserResponse } from '@src/domain/model/UserResponse';

@injectable()
export class UserRepositoryImpl implements UserRepository {
  @inject(TYPES.UserDao) private userDao!: UserDao;
  async authenticateUser(identifier: string, password: string): Promise<User | null> {
    const user = await this.userDao.authenticateUser(identifier, password);
    if (user === undefined) {
      return null;
    }
    return userDocumentToUser(user);
  }

  async registerUser(
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    userType: string,
    profileImage: string,
    shopCategories: string,
    shopLocations: string
  ): Promise<Result<User>> {
    try {
      const user = await this.userDao.signupUser(
        name,
        surname,
        username,
        email,
        password,
        userType,
        profileImage,
        shopCategories,
        shopLocations
      );
      return success(userDocumentToUser(user));
    } catch (error) {
      if (error instanceof MongoError) {
        return handleMongoError(error);
      }
      return failure(serverError, 500);
    }
  }
}
