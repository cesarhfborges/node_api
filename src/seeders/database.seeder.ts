import {appDataSource} from "../database/datasource";
import {clientesSeeder} from "./clientes.seeder";
import {usuariosSeeder} from "./usuarios.seeder";

appDataSource.connect().then(async connection => {
  // await clientesSeeder();
  await usuariosSeeder();
  await connection.close();
}).catch(error => console.log(error));