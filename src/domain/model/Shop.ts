export class Shop {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    profileImage: string;
    userType: string;
    shopCategories: string[];
    shopLocations: string[];
    constructor(
      id: string,
      name: string,
      surname: string,
      username: string,
      email: string,
      profileImage: string,
      userType: string,
      shopCategories: string[],
      shopLocations: string[]
    ) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.username = username;
      this.email = email;
      this.profileImage = profileImage;
      this.userType = userType;
      this.shopCategories = shopCategories;
      this.shopLocations = shopLocations;
    }
  }
  