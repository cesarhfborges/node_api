import {Repository} from "typeorm";
import {Funcionario} from "../entities";
import {appDataSource} from "../database/datasource";
import {fakerPT_BR as faker} from "@faker-js/faker";
import logger from "node-color-log";

export async function usuariosSeeder() {

  logger.error(self.name);

  const funcionarioRepository: Repository<Funcionario> = appDataSource.getRepository(Funcionario);

  try {
    const f = new Funcionario();
    f.pessoa.nome = "Administrador";
    f.pessoa.sobrenome = "";
    f.pessoa.cpf = "00000000000";

    f.usuario.email = "admin@admin.com";
    f.usuario.senha = "12345678";

    const obj = funcionarioRepository.create(f);
    await funcionarioRepository.save(obj);
  } catch (error) {
    logger.error(error);
  }


  // const lista: Funcionario[] = Array.from({length: 5}).map((_, i) => {
  //   const f = new Funcionario();
  //   f.pessoa.nome = ""
  //
  // });


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