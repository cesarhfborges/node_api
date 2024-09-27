import {appDataSource} from "../database/datasource";
import {Repository} from "typeorm";
import {Marca, Modelo} from "../entities";
import {fakerPT_BR as faker} from "@faker-js/faker";

export async function modelosSeeder() {
  const marcaRepository: Repository<Marca> = appDataSource.getRepository(Marca);
  const repository: Repository<Modelo> = appDataSource.getRepository(Modelo);

  const marcas = await marcaRepository.find();

  for (const marca of marcas) {
    const lista: Modelo[] = Array.from({length: 5}).map((_, i) => ({
      nome: faker.vehicle.model(),
      marca: marca
    }));

    for (const item of lista) {
      const obj = repository.create(item);
      await repository.save(obj);
    }
  }
}