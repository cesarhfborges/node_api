import * as mysqlDriver from 'mysql';
import {DataSource} from "typeorm";
import {LoggerOptions} from "typeorm/logger/LoggerOptions";
import {CONFIG} from "../config/config";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

const logs: LoggerOptions = [
  'error',
  'info',
  'schema'
];

const dataSourceConfig: DataSourceOptions = {
  driver: mysqlDriver,
  type: "mysql",
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  database: CONFIG.database.database,
  username: CONFIG.database.username,
  password: CONFIG.database.password,
  synchronize: false,
  logging: CONFIG.app.dev ? logs : false,
  migrationsTableName: "migrations",
  entities: ["src/entities/**/*{.js,.ts}"],
}

const appDataSource = new DataSource(dataSourceConfig);


export {appDataSource, dataSourceConfig}