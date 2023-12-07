import { injectable } from 'inversify';
import { UserEntity, UserDocument } from 'src/data/entity/User';
import { convertStringToList } from '../util/converterUtil';

export interface UserDao {
  authenticateUser(identifier: string, password: string): Promise<UserDocument>;
  signupUser(
    name: string,
    surename: string,
    username: string,
    email: string,
    password: string,
    userType: string,
    profileImage: string,
    shopCategories: string,
    shopLocations: string
  ): Promise<UserDocument>;
}

@injectable()
export class UserDaoImpl implements UserDao {
  async authenticateUser(identifier: string, password: string): Promise<UserDocument> {
    const user = await UserEntity.find({
      $and: [{ password: password }, { $or: [{ username: identifier }, { email: identifier }] }],
    });
    return user[0] as UserDocument;
  }

  async signupUser(
    name: string,
    surename: string,
    username: string,
    email: string,
    password: string,
    userType: string,
    profileImage: string,
    shopCategories: string,
    shopLocations: string
  ): Promise<UserDocument> {
    try {
      const user = new UserEntity({
        name: name,
        surename: surename,
        username: username,
        email: email,
        password: password,
        userType: userType,
        profileImage: profileImage,
        shopCategories: convertStringToList(shopCategories),
        shopLocations: convertStringToList(shopLocations),
      });
      return await user.save();
    } catch (e) {
      throw e;
    }
  }
}
