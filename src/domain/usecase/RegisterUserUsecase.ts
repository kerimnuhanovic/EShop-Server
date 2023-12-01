import { inject, injectable } from 'inversify';
import { User } from 'src/domain/model/User';
import { TYPES } from 'types';
import { UserRepository } from '../repository/UserRepository';
import { Result } from '../util/Result';

@injectable()
export class RegisterUserUsecase {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository;
  invoke(
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
    return this.userRepository.registerUser(
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
  }
}
