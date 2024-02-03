import { inject, injectable } from "inversify";
import { TYPES } from "types";
import { ShopRepository } from "../repository/ShopRepository";
import { Result } from "../util/Result";
import { Shop } from "../model/Shop";

@injectable()
export class GetShopUsecase {
    @inject(TYPES.ShopRepository) private shopRepository!: ShopRepository
    invoke(id: string): Promise<Result<Shop>> {
        return this.shopRepository.getShopById(id)
    }
}