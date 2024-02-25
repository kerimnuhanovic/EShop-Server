import { Shop } from "@src/domain/model/Shop";
import { UserDocument } from "../entity/User";

export const userDocumentToShop = (userDocument: UserDocument): Shop => {
    return new Shop(
      userDocument._id.toString(),  
      userDocument.name,
      userDocument.surname,
      userDocument.username,
      userDocument.email,
      userDocument.profileImage,
      userDocument.userType,
      userDocument.shopCategories,
      userDocument.shopLocations
    );
  };