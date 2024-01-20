import { Product } from '@src/domain/model/Product';
import { ProductDocument } from 'src/data/entity/Product';

export const productDocumentToProduct = (productDocument: ProductDocument): Product => {
  return new Product(
    productDocument._id.toString(),
    productDocument.title,
    productDocument.description,
    productDocument.category,
    productDocument.price,
    productDocument.shop,
    new Date(productDocument.date.toString()),
    productDocument.images
  );
};
