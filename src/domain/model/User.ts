export class User {
  name: string;
  suremame: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  userType: string;
  shopCategories: string[];
  shopLocations: string[];
  constructor(
    name: string,
    surename: string,
    username: string,
    email: string,
    password: string,
    profileImage: string,
    userType: string,
    shopCategories: string[],
    shopLocations: string[]
  ) {
    this.name = name;
    this.suremame = surename;
    this.username = username;
    this.email = email;
    this.password = password;
    this.profileImage = profileImage;
    this.userType = userType;
    this.shopCategories = shopCategories;
    this.shopLocations = shopLocations;
  }
}
