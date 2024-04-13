import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { AccessToken } from '../model/AccessToken';

@injectable()
export class CreateTokenUsecase {
  invoke(username: string, userType: string, profileImage: string): AccessToken {
    const userData = { username: username, userType: userType, profileImage: profileImage };
    return { accessToken: jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET!) };
  }
}
