export class Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  shop: string;
  date: Date;
  images: string[];
  constructor(
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    date: Date,
    images: string[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.shop = shop;
    this.date = date;
    this.images = images;
  }
}
