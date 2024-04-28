import { User } from '@src/domain/model/User';
import { UserResponse } from '@src/domain/model/UserResponse';
import { UserDocument } from 'src/data/entity/User';

export const userDocumentToUser = (userDocument: UserDocument): User => {
  return new User(
    userDocument.name,
    userDocument.surname,
    userDocument.username,
    userDocument.email,
    userDocument.password,
    userDocument.profileImage,
    userDocument.userType,
    userDocument.shopCategories,
    userDocument.shopLocations
  );
};

export const userDocumentToUserResponse = (userDocument: UserDocument): UserResponse => {
  return {  
    name: userDocument.name,
    surename: userDocument.surname,
    username: userDocument.username,
    email: userDocument.email,
    profileImage: userDocument.profileImage,
    userType: userDocument.userType,
    shopCategories: userDocument.shopCategories,
    shopLocations: userDocument.shopLocations
  }
};
