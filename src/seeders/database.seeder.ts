import {appDataSource} from "../database/datasource";
import {clientesSeeder} from "./clientes.seeder";

appDataSource.connect().then(async connection => {
  await clientesSeeder();
  await connection.close();
}).catch(error => console.log(error));