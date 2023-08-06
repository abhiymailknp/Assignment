import pgPromise from 'pg-promise';

const pgp = pgPromise(); // You can pass additional configuration options here if needed.

const connectionConfig = {
  host: 'localhost',
  port: 5432,
  database: 'AssigmentDB',
  user: 'postgres',
  password: '9949',
};


export const db = pgp(connectionConfig);