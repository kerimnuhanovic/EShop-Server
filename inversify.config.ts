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

const container = new Container();
container.bind<DatabaseAceessRepository>(TYPES.DatabaseAccessRepository).to(DatabaseAceessRepositoryImpl);
container.bind<ConnectToDbUsecase>(TYPES.ConnectToDbUsecase).to(ConnectToDbUsecase);
container.bind<UserDao>(TYPES.UserDao).to(UserDaoImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<AuthenticateUserUserCase>(TYPES.AuthenticateUserUsecase).to(AuthenticateUserUserCase);
container.bind<CreateTokenUsecase>(TYPES.CreateTokenUsecase).to(CreateTokenUsecase);
container.bind<RegisterUserUsecase>(TYPES.RegisterUserUsecase).to(RegisterUserUsecase);
container.bind<StoreImageRepository>(TYPES.StoreImageRepository).to(StoreImageRepositoryImpl);

export { container };
