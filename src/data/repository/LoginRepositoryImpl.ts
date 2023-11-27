import { User } from '@src/domain/model/User';
import { LoginRepository } from '@src/domain/repository/LoginRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { LoginDao } from 'src/data/dao/LoginDao';
import { userDocumentToUser } from '../mapper/UserMapper';

@injectable()
export class LoginRepositoryImpl implements LoginRepository {
  @inject(TYPES.LoginDao) private loginDao!: LoginDao;
  async authenticateUser(identifier: string, password: string): Promise<User | null> {
    const user = await this.loginDao.authenticateUser(identifier, password);
    if (user === undefined) {
      return null;
    }
    console.log(user);
    return userDocumentToUser(user);
  }
}
