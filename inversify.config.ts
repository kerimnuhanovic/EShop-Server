import { Container } from 'inversify';
import { TYPES } from './types';
import { DatabaseAceessRepository } from './src/domain/repository/DatabaseAccessRepository';
import { DatabaseAceessRepositoryImpl } from './src/data/repository/DatabaseAceessRepositoryImpl';
import { ConnectToDbUsecase } from './src/domain/usecase/ConnectToDbUsecase';
import { UserDao, UserDaoImpl } from '@src/data/dao/UserDao';
import { UserRepository } from '@src/domain/repository/UserRepository';
import { UserRepositoryImpl } from '@src/data/repository/UserRepositoryImpl';
import { AuthenticateUserUserCase } from '@src/domain/usecase/AuthenticateUserUsecase';
import { CreateTokenUsecase } from '@src/domain/usecase/CreateTokenUsecase';
import { RegisterUserUsecase } from '@src/domain/usecase/RegisterUserUsecase';
import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';
import { StoreImageRepositoryImpl } from '@src/data/repository/StoreImageRepositoryImpl';
import { ProductDao, ProductDaoImpl } from '@src/data/dao/ProductDao';
import { ProductRepository } from '@src/domain/repository/ProductRepository';
import { ProductRepositoryImpl } from '@src/data/repository/ProductRepositoryImpl';
import { AddProductUsecase } from '@src/domain/usecase/AddProductUsecase';
import { UserTokenValidationUsecase } from '@src/domain/usecase/UserTokenValidationUsecase';
import { GetPopularProductsUsecase } from '@src/domain/usecase/GetPopularProductsUsecase';
import { GetAllProductsUsecase } from '@src/domain/usecase/GetAllProductsUsecase';
import { GetProductUsecase } from '@src/domain/usecase/GetProductsUsecase';
import { ShopDao, ShopDaoImpl } from '@src/data/dao/ShopDao';
import { ShopRepository } from '@src/domain/repository/ShopRepository';
import { ShopRepositoryImpl } from '@src/data/repository/ShopRepositoryImpl';
import { GetShopUsecase } from '@src/domain/usecase/GetShopUsecase';
import { CartDao, CartDaoImpl } from '@src/data/dao/CartDao';
import { CartRepository } from '@src/domain/repository/CartRepository';
import { CartRepositoryImpl } from '@src/data/repository/CartRepositoryImpl';
import { AddProductToCartUsecase } from '@src/domain/usecase/AddProductToCartUsecase';

const container = new Container();
container.bind<DatabaseAceessRepository>(TYPES.DatabaseAccessRepository).to(DatabaseAceessRepositoryImpl);
container.bind<ConnectToDbUsecase>(TYPES.ConnectToDbUsecase).to(ConnectToDbUsecase);
container.bind<UserDao>(TYPES.UserDao).to(UserDaoImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<AuthenticateUserUserCase>(TYPES.AuthenticateUserUsecase).to(AuthenticateUserUserCase);
container.bind<CreateTokenUsecase>(TYPES.CreateTokenUsecase).to(CreateTokenUsecase);
container.bind<RegisterUserUsecase>(TYPES.RegisterUserUsecase).to(RegisterUserUsecase);
container.bind<StoreImageRepository>(TYPES.StoreImageRepository).to(StoreImageRepositoryImpl);
container.bind<ProductDao>(TYPES.ProductDao).to(ProductDaoImpl);
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepositoryImpl);
container.bind<AddProductUsecase>(TYPES.AddProductUsecase).to(AddProductUsecase);
container.bind<UserTokenValidationUsecase>(TYPES.UserTokenValidationUsecase).to(UserTokenValidationUsecase)
container.bind<GetPopularProductsUsecase>(TYPES.GetPopularProductsUsecase).to(GetPopularProductsUsecase)
container.bind<GetAllProductsUsecase>(TYPES.GetAllProductsUsecase).to(GetAllProductsUsecase)
container.bind<GetProductUsecase>(TYPES.GetProductUsecase).to(GetProductUsecase)
container.bind<ShopDao>(TYPES.ShopDao).to(ShopDaoImpl)
container.bind<ShopRepository>(TYPES.ShopRepository).to(ShopRepositoryImpl)
container.bind<GetShopUsecase>(TYPES.GetShopUsecase).to(GetShopUsecase)
container.bind<CartDao>(TYPES.CartDao).to(CartDaoImpl)
container.bind<CartRepository>(TYPES.CartRepository).to(CartRepositoryImpl)
container.bind<AddProductToCartUsecase>(TYPES.AddProductToCartUsecase).to(AddProductToCartUsecase)

export { container };
