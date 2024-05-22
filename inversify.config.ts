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
import { GetAllShopsUsecase } from '@src/domain/usecase/GetAllShopsUsecase';
import { GetPopularShopsUsecase } from '@src/domain/usecase/GetPopularShopsUsecase';
import { GetShopProductsUsecase } from '@src/domain/usecase/GetShopProductsUsecase';
import { GetShopReviewsUsecase } from '@src/domain/usecase/GetShopReviewsUsecase';
import { CalculateShopRatingUsecase } from '@src/domain/usecase/CalculateShopRatingUsecase';
import { AddReviewUsecase } from '@src/domain/usecase/AddReviewUsecase';
import { SocketRepository } from '@src/domain/repository/SocketRepository';
import { SocketRepositoryImpl } from '@src/data/repository/SocketRepositoryImpl';
import { InitializeWebSocketUsecase } from '@src/domain/usecase/InitializeWebSocketUsecase';
import { MessageDao, MessageDaoImpl } from '@src/data/dao/MessageDao';
import { ChatRepository } from '@src/domain/repository/ChatRepository';
import { ChatRepositoryImpl } from '@src/data/repository/ChatRepositoryImpl';
import { GetUserConversationsUsecase } from '@src/domain/usecase/GetUserConversationsUsecase';
import { UpdateUserConversationUsecase } from '@src/domain/usecase/UpdateUserConversationUsecase';
import { GetCartItemsUsecase } from '@src/domain/usecase/GetCartItemsUsecase';
import { OrderDao, OrderDaoImpl } from '@src/data/dao/OrderDao';
import { OrderRepositoryImpl } from '@src/data/repository/OrderRepositoryImpl';
import { OrderRepository } from '@src/domain/repository/OrderRepository';
import { AddOrderUsecase } from '@src/domain/usecase/AddOrderUsecase';
import { DeleteCartItemUsecase } from '@src/domain/usecase/DeleteCartItemUsecase';
import { ListCustomerOrdersUsecase } from '@src/domain/usecase/ListCustomerOrdersUsecase';

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
container.bind<GetAllShopsUsecase>(TYPES.GetAllShopsUsecase).to(GetAllShopsUsecase)
container.bind<GetPopularShopsUsecase>(TYPES.GetPopularShopsUsecase).to(GetPopularShopsUsecase)
container.bind<GetShopProductsUsecase>(TYPES.GetShopProductsUsecase).to(GetShopProductsUsecase)
container.bind<GetShopReviewsUsecase>(TYPES.GetShopReviewsUsecase).to(GetShopReviewsUsecase)
container.bind<CalculateShopRatingUsecase>(TYPES.CalculateShopRatingUsecase).to(CalculateShopRatingUsecase)
container.bind<AddReviewUsecase>(TYPES.AddReviewUsecase).to(AddReviewUsecase)
container.bind<SocketRepository>(TYPES.SocketRepository).to(SocketRepositoryImpl)
container.bind<InitializeWebSocketUsecase>(TYPES.InitializeWebSocketUsecase).to(InitializeWebSocketUsecase)
container.bind<MessageDao>(TYPES.MessageDao).to(MessageDaoImpl)
container.bind<ChatRepository>(TYPES.ChatRepository).to(ChatRepositoryImpl)
container.bind<GetUserConversationsUsecase>(TYPES.GetUserConversationsUsecase).to(GetUserConversationsUsecase)
container.bind<UpdateUserConversationUsecase>(TYPES.UpdateUserConversationUsecase).to(UpdateUserConversationUsecase)
container.bind<GetCartItemsUsecase>(TYPES.GetCartItemsUsecase).to(GetCartItemsUsecase)
container.bind<OrderDao>(TYPES.OrderDao).to(OrderDaoImpl)
container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepositoryImpl)
container.bind<AddOrderUsecase>(TYPES.AddOrderUsecase).to(AddOrderUsecase)
container.bind<DeleteCartItemUsecase>(TYPES.DeleteCartItemUsecase).to(DeleteCartItemUsecase)
container.bind<ListCustomerOrdersUsecase>(TYPES.ListCustomerOrdersUsecase).to(ListCustomerOrdersUsecase)

export { container };
