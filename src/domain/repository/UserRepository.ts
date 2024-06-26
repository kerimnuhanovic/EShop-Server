import { User } from 'src/domain/model/User';
import { Result } from '../util/Result';
import { UserResponse } from '@src/domain/model/UserResponse';

export interface UserRepository {
  authenticateUser(identifier: string, password: string): Promise<User | null>;
  registerUser(
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    userType: string,
    profileImage: string,
    shopCategories: string,
    shopLocations: string
  ): Promise<Result<User>>;
}
