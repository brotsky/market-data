require('dotenv').config();
import * as path from 'path';
import * as url from 'url';

export const NODE_ENV = process.env.NODE_ENV || 'production';

export const isProduction = NODE_ENV === 'production';

export const NODE_PORT = process.env.PORT || 1000;

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/market-data'

console.log('DATABASE_URL', DATABASE_URL)

const db_url = url.parse(DATABASE_URL);

export const DATABASE_OPTIONS = {
  type: db_url.protocol.substr(0, db_url.protocol.length - 1),
  host: db_url.hostname,
  username: db_url.auth.substr(0, db_url.auth.indexOf(':')),
  password: db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length),
  database: db_url.path.slice(1),
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '../entities/*.{js,ts}')],
  ssl: true,
};

export const IEXCLOUD_API_KEY = isProduction ? process.env.IEXCLOUD_PRODUCTION_API_KEY : process.env.IEXCLOUD_SANDBOX_API_KEY;
