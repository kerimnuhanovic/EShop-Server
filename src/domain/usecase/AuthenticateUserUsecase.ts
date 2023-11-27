import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { LoginRepository } from 'src/domain/repository/LoginRepository';
import { User } from 'src/domain/model/User';

@injectable()
export class AuthenticateUserUserCase {
  @inject(TYPES.LoginRepository) private loginRepository!: LoginRepository;
  invoke(identifier: string, password: string): Promise<User | null> {
    return this.loginRepository.authenticateUser(identifier, password);
  }
}
