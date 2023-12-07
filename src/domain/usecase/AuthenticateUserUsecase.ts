import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { UserRepository } from '@src/domain/repository/UserRepository';
import { User } from 'src/domain/model/User';

@injectable()
export class AuthenticateUserUserCase {
  @inject(TYPES.UserRepository) private userRepository!: UserRepository;
  invoke(identifier: string, password: string): Promise<User | null> {
    return this.userRepository.authenticateUser(identifier, password);
  }
}
