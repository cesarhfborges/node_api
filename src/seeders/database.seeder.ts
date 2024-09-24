import {appDataSource} from "../database/datasource";
import {usuariosSeeder} from "./usuarios.seeder";
import logger from "node-color-log";
import {cargosSeeder} from "./cargos.seeder";
import {DataSource} from "typeorm";

const seeds = [
  cargosSeeder,
  usuariosSeeder,
  // clientesSeeder,
]

appDataSource.initialize().then(async connection => {
  // Drop database
  await connection.dropDatabase();
  // Recreate schema
  await connection.synchronize(true);
  // Seed data into tables
  for (const seeder of seeds) {
    logger.info(`calling ${seeder.name}.`);
    await seeder();
    logger.success(`Success ${seeder.name}.`);
  }
  await connection.destroy();
}).catch(error => console.log(error));