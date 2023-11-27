import { injectable } from 'inversify';
import { UserEntity, UserDocument } from 'src/data/entity/User';

export interface LoginDao {
  authenticateUser(identifier: string, password: string): Promise<UserDocument>;
}

@injectable()
export class LoginDaoImpl implements LoginDao {
  async authenticateUser(identifier: string, password: string): Promise<UserDocument> {
    const user = await UserEntity.find({
      $and: [{ password: password }, { $or: [{ username: identifier }, { email: identifier }] }],
    });
    return user[0] as UserDocument;
  }
}
