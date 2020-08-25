const httpContext = require('express-cls-hooked');
import Container from '../lib/di/Container';
import DB from './DatabaseConnector';

import SecurityRepository from '../units/security';

import { DATABASE_OPTIONS } from '../config/vars';
import { DEPENDENCIES } from '../utils/constants';

export default async () => {
  const container = new Container();
  const db = new DB(DATABASE_OPTIONS, httpContext);

  const connection = await db.connect();

  await connection.synchronize();

  container.register('DB', db);
  container.register(DEPENDENCIES.SECURITY_REPOSITORY, new SecurityRepository(db));

  return container;
};
