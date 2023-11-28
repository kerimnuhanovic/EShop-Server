import { User } from 'src/domain/model/User';
import { Result } from '../util/Result';

export interface UserRepository {
  authenticateUser(identifier: string, password: string): Promise<User | null>;
  registerUser(
    name: string,
    surename: string,
    username: string,
    email: string,
    password: string,
    userType: string,
    profileImage: string,
    shopCategories: string,
    shopLocations: string
  ): Promise<Result<User>>;
}
