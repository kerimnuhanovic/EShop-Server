import { Shop } from "@src/domain/model/Shop";
import { ShopRepository } from "@src/domain/repository/ShopRepository";
import { Result } from "@src/domain/util/Result";
import { inject, injectable } from "inversify";
import { TYPES } from "types";

@injectable()
export class GetAllShopsUsecase {
    @inject(TYPES.ShopRepository) private shopRepository!: ShopRepository
    invoke(offset: number): Promise<Result<Shop[]>> {
        return this.shopRepository.getAllShops(offset)
    }
}