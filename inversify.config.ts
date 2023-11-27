import { Container } from 'inversify';
import { TYPES } from './types';
import { DatabaseAceessRepository } from './src/domain/repository/DatabaseAccessRepository';
import { DatabaseAceessRepositoryImpl } from './src/data/repository/DatabaseAceessRepositoryImpl';
import { ConnectToDbUsecase } from './src/domain/usecase/ConnectToDbUsecase';
import { LoginDao, LoginDaoImpl } from '@src/data/dao/LoginDao';
import { LoginRepository } from '@src/domain/repository/LoginRepository';
import { LoginRepositoryImpl } from '@src/data/repository/LoginRepositoryImpl';
import { AuthenticateUserUserCase } from '@src/domain/usecase/AuthenticateUserUsecase';

const container = new Container();
container.bind<DatabaseAceessRepository>(TYPES.DatabaseAccessRepository).to(DatabaseAceessRepositoryImpl);
container.bind<ConnectToDbUsecase>(TYPES.ConnectToDbUsecase).to(ConnectToDbUsecase);
container.bind<LoginDao>(TYPES.LoginDao).to(LoginDaoImpl);
container.bind<LoginRepository>(TYPES.LoginRepository).to(LoginRepositoryImpl);
container.bind<AuthenticateUserUserCase>(TYPES.AuthenticateUserUsecase).to(AuthenticateUserUserCase);

export { container };
