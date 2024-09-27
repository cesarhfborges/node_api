import {appDataSource} from "../database/datasource";
import {Repository} from "typeorm";
import {Marca} from "../entities";
import {fakerPT_BR as faker} from "@faker-js/faker";

export async function marcasSeeder() {
  const repository: Repository<Marca> = appDataSource.getRepository(Marca);

  const lista: Marca[] = Array.from({length: 30}).map((_, i) => ({
    nome: faker.vehicle.manufacturer(),
  }));

  for (const item of lista) {
    const obj = repository.create(item);
    await repository.save(obj);
  }
}