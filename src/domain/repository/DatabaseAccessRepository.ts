export interface DatabaseAceessRepository {
  connectToDb: (databaseToken: string) => void;
}
