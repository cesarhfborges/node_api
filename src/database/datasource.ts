import * as mysqlDriver from 'mysql';
import {DataSource} from "typeorm";
import {LoggerOptions} from "typeorm/logger/LoggerOptions";
import {CONFIG} from "../config/config";

const logs: LoggerOptions = [
  'error',
  'info',
  'schema'
];

const appDataSource = new DataSource({
  driver: mysqlDriver,
  type: "mysql",
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  database: CONFIG.database.database,
  username: CONFIG.database.username,
  password: CONFIG.database.password,
  synchronize: true,
  dropSchema: true,
  logging: CONFIG.app.dev ? logs : false,
  migrationsTableName: "migrations",
  entities: ["src/entities/**/*.ts"],
});


export {appDataSource}