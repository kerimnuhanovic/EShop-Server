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
      console.log("Evo me u DAO" + e)
      throw e;
    }
  }
}
