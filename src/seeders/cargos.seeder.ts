import {appDataSource} from "../database/datasource";
import {Cargo, Cliente} from "../entities";
import {Repository} from "typeorm";

export async function cargosSeeder() {

  const repository: Repository<Cargo> = appDataSource.getRepository(Cargo);

  const cargos: string[] = [
    'Administrador',
    'Vendedor',
    'Estoquista'
  ];
  // const size: number = await repository.count();
  for (const cargo of cargos) {
    await repository.save({nome: cargo});
  }
  console.log('Clientes seeded successfully');
}