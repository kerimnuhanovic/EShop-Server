import { inject, injectable } from 'inversify';
import { TYPES } from 'types';
import { DatabaseAceessRepository } from '../repository/DatabaseAccessRepository';

@injectable()
export class ConnectToDbUsecase {
  @inject(TYPES.DatabaseAccessRepository) private databaseAccessRepository!: DatabaseAceessRepository;
  invoke(databaseToken: string) {
    this.databaseAccessRepository.connectToDb(databaseToken);
  }
}
