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
    rating: number;
    constructor(
      id: string,
      name: string,
      surname: string,
      username: string,
      email: string,
      profileImage: string,
      userType: string,
      shopCategories: string[],
      shopLocations: string[],
      rating: number
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
      this.rating = rating
    }
  }
  