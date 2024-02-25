import { Product } from "@src/domain/model/Product";
import { ShopRepository } from "@src/domain/repository/ShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class GetShopProductsUsecase {
    @inject(TYPES.ShopRepository) private shopRepository!: ShopRepository
    invoke(shopId: string): Promise<Result<Product[]>> {
        return this.shopRepository.getShopProducts(shopId)
    }
}