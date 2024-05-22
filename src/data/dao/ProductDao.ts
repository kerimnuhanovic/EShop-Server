import { injectable } from 'inversify';
import { ProductEntity, ProductDocument } from 'src/data/entity/Product';
import { convertStringToList } from '../util/converterUtil';
import { OrderBy } from '@src/domain/util/SortAndOrderUtils';

export interface ProductDao {
  addProduct(
    title: string,
    description: string,
    category: string,
    price: number,
    shop: string,
    images: string[]
  ): Promise<ProductDocument>;
  getPopularProducts(): Promise<ProductDocument[]>;
  getAllProducts(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<ProductDocument[]>;
  getProduct(productId: string): Promise<ProductDocument | null>;
  listProducts(products: string[]): Promise<ProductDocument[]>;
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
  async getAllProducts(offset: number, searchQuery?: String | null, filteredCategories?: string[], sortBy?: string, orderBy?: string): Promise<ProductDocument[]> {
    try {
      // set limit to 20 when more products are added to db
      const products = await ProductEntity.find(
        {
          $and: [
            {title: {$regex: searchQuery ?? '', $options: "i"}},
            filteredCategories ? {category: {
              $elemMatch: { $in: filteredCategories }
          }} : {}
          ]
          
        }
        ).skip(offset).limit(5).sort([[sortBy ? sortBy : "title", orderBy === OrderBy.ASC ? 1 : -1]])
      return products;``
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

  async listProducts(products: string[]): Promise<ProductDocument[]> {
    const productDocuments = await ProductEntity.find({
      _id: {$in: products}
    })
    
    return productDocuments
  }

}
