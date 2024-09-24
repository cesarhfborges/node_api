import {Repository} from "typeorm";
import {Cargo, Perfil, Pessoa, Usuario} from "../entities";
import {appDataSource} from "../database/datasource";
import {fakerPT_BR as faker} from "@faker-js/faker";
import logger from "node-color-log";

export async function usuariosSeeder() {
  const funcionarioRepository: Repository<Perfil> = appDataSource.getRepository(Perfil);
  const cargoRepository: Repository<Cargo> = appDataSource.getRepository(Cargo);

  const p = new Pessoa();
  p.nome = "Administrador";
  p.sobrenome = "";
  p.cpf = "00000000000";

  const u = new Usuario();
  u.email = "admin@admin.com";
  u.senha = "12345678";

  const f = new Perfil();
  f.pessoa = p;
  f.usuario = u;

  const cargos = await cargoRepository.find();

  f.cargo = cargos[0];

  await funcionarioRepository.save(f);


  // const lista: any[] = Array.from({length: 30}).map((_, i) => ({
  //   nome: faker.person.firstName(i % 2 == 0 ? 'male' : 'female'),
  //   sobrenome: faker.person.lastName(i % 2 == 0 ? 'male' : 'female'),
  //   cpf_cnpj: ('00000000000' + faker.number.int({min: 10000000000, max: 99999999999})).slice(-11),
  //   cep: '00000000',
  //   logradouro: '',
  //   bairro: '',
  //   numero: '',
  //   cidade: '',
  //   uf: '',
  //   telefone: '',
  // }));
  // // const size = await repository.find();
  // for (const item of lista) {
  //   const obj = repository.create(item);
  //   await repository.save(obj);
  // }
  // console.log('Clientes seeded successfully');
}