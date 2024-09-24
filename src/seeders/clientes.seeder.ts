import {appDataSource} from "../database/datasource";
import {Cliente} from "../entities";
import {Repository} from "typeorm";
import {fakerPT_BR as faker} from "@faker-js/faker";

export async function clientesSeeder() {

  const repository: Repository<Cliente> = appDataSource.getRepository(Cliente);

  const lista: any[] = Array.from({length: 30}).map((_, i) => ({
    nome: faker.person.firstName(i % 2 == 0 ? 'male' : 'female'),
    sobrenome: faker.person.lastName(i % 2 == 0 ? 'male' : 'female'),
    cpf_cnpj: ('00000000000' + faker.number.int({min: 10000000000, max: 99999999999})).slice(-11),
    cep: '00000000',
    logradouro: '',
    bairro: '',
    numero: '',
    cidade: '',
    uf: '',
    telefone: '',
  }));
  // const size = await repository.find();
  for (const item of lista) {
    const obj = repository.create(item);
    await repository.save(obj);
  }
  console.log('Clientes seeded successfully');
}