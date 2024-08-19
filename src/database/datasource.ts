import * as mysqlDriver from 'mysql';
import {DataSource} from "typeorm";

const appDataSource = new DataSource({
  driver: mysqlDriver,
  "type": "mysql",
  "host": "192.168.68.230",
  "port": 3306,
  "username": "cesar",
  "password": "91344356",
  "database": "confeccao",
  "synchronize": true,
  "logging": true,
  "migrationsTableName": "migrations",
  "entities": ["src/entitys/**/*.ts"],
  // "migrations": ["src/migrations/**/*.ts"],
  // "subscribers": ["src/subscribers/**/*.ts"],
  // "cli": {
  //   "entitiesDir": "src/entity",
  //   "migrationsDir": "src/migration",
  //   "subscribersDir": "src/subscriber"
  // }
  // location: "",
  // region: "",
  // resourceArn: "",
  // secretArn: "",
});


export {appDataSource}