import { User } from '@src/domain/model/User';
import { UserDocument } from 'src/data/entity/User';

export const userDocumentToUser = (userDocument: UserDocument): User => {
  return new User(
    userDocument.name,
    userDocument.surename,
    userDocument.username,
    userDocument.email,
    userDocument.password,
    userDocument.profileImage,
    userDocument.userType,
    userDocument.shopCategories
  );
};
