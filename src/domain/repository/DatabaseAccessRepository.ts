interface DatabaseAceessRepository {
  connectToDb(databaseToken: string): void;
}

export default DatabaseAceessRepository;
