import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { AccessToken } from '../model/AccessToken';

@injectable()
export class CreateTokenUsecase {
  invoke(username: string, userType: string): AccessToken {
    const userData = { username: username, userType: userType };
    return { accessToken: jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET!) };
  }
}
