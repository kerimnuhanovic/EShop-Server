import { User } from 'src/domain/model/User';

export interface LoginRepository {
  authenticateUser(identifier: string, password: string): Promise<User | null>;
}
