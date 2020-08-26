import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

class DB {
  connection: Connection;
  options: string;
  context: { set: (arg0: string, arg1: any) => any; get: (arg0: string) => any; };
  tracked = {}

  constructor(options: any, context: any) {
    this.options = options
    this.context = context
  }

  async connect() {
    this.connection = await createConnection(this.options);
    return this.connection;
  }

  getConnection() {
    if (!this.connection) throw Error('no database connection, make sure to connect');
    return this.connection;
  }

  async clearTable(name: any) {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(name)
      .execute();
    return result;
  }

  setTrack(queryRunner: any) {
    return this.context.set('queryRunner', queryRunner)
  }

  getTrack() {
    return this.context.get('queryRunner');
  }
}

export default DB;
