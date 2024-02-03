import { injectable } from 'inversify';
import { ProductEntity, ProductDocument } from 'src/data/entity/Product';
import { convertStringToList } from '../util/converterUtil';
export interface ProductDao {
  addProduct(
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    images: string[]
  ): Promise<ProductDocument>;
  getPopularProducts(): Promise<ProductDocument[]>
  getAllProducts(offset: number): Promise<ProductDocument[]>
  getProduct(productId: string): Promise<ProductDocument | null>
}

@injectable()
export class ProductDaoImpl implements ProductDao {
  async addProduct(
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    images: string[]
  ): Promise<ProductDocument> {
    try {
      const product = new ProductEntity({
        title: title,
        description: description,
        category: convertStringToList(category),
        price: price,
        shop: shop,
        images: images,
      });
      return await product.save();
    } catch (e) {
      throw e;
    }
  }
  async getPopularProducts(): Promise<ProductDocument[]> {
    try {
      // Update this to retrieve most popular products once orders are implemented
      const products = await ProductEntity.find({}) 
      return products;   
    } catch (e) {
      throw e;
    }
  }
  async getAllProducts(offset: number): Promise<ProductDocument[]> {
    try {
      // set limit to 20 when more products are added to db
      const products = await ProductEntity.find({}).skip(offset).limit(5)
      return products;
    } catch (e) {
      throw e;
    }
  }
  async getProduct(productId: string): Promise<ProductDocument | null> {
    try {
      const product = await ProductEntity.findById(productId)
      return product
    } catch (e) {
      throw e;
    }
  }
}
