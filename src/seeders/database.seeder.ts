import {appDataSource} from "../database/datasource";
import {clientesSeeder} from "./clientes.seeder";
import {usuariosSeeder} from "./usuarios.seeder";
import logger from "node-color-log";
import {cargosSeeder} from "./cargos.seeder";

const seeds = [
  // clientesSeeder,
  cargosSeeder,
  usuariosSeeder,
]


appDataSource.connect().then(async connection => {
  // await clientesSeeder();
  for (const seeder of seeds) {
    logger.info(`calling ${seeder.name}.`);
    await seeder();
    logger.success(`Success ${seeder.name}.`);
  }
  await connection.close();
}).catch(error => console.log(error));