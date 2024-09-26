import {Repository} from "typeorm";
import {Endereco, Perfil, Usuario} from "../entities";
import {appDataSource} from "../database/datasource";
import {Funcionario} from "../entities/funcionario";
import {fakerPT_BR as faker} from "@faker-js/faker";
import {Cliente} from "../entities/cliente";

export async function usuariosSeeder() {
  const usuarioRepository: Repository<Usuario> = appDataSource.getRepository(Usuario);
  const funcionarioRepository: Repository<Funcionario> = appDataSource.getRepository(Funcionario);
  const clienteRepository: Repository<Cliente> = appDataSource.getRepository(Cliente);
  const enderecoRepository: Repository<Endereco> = appDataSource.getRepository(Endereco);

  const f = new Funcionario();
  f.nome = 'administrador';
  f.sobrenome = "";
  f.cpf = "00000000000";
  const perfil = await funcionarioRepository.save(f);


  const u = new Usuario();
  u.email = "admin@admin.com";
  u.senha = "12345678";
  u.ativo = true;
  u.confirmado_em = new Date();
  u.perfil = f;
  await usuarioRepository.save(u);

  const endereco = new Endereco();
  endereco.perfil = perfil;
  endereco.cep = "72009001";
  endereco.logradouro = "RUA 99 CONJUNTO 10 CASA 77";
  endereco.numero = "77";
  endereco.complemento = "Casa 77";
  endereco.bairro = "Samambaia";
  endereco.cidade = "Brasilia";
  endereco.uf = "DF";

  await enderecoRepository.insert(endereco);

  const mocks: Funcionario[] | Cliente[] = Array.from({length: 150}).map((_, i) => {
    if (i % 2 === 0) {
      const mock = new Funcionario();
      mock.nome = faker.person.firstName();
      mock.sobrenome = faker.person.lastName();
      return mock;
    } else {
      const mock = new Cliente();
      mock.nome = faker.person.firstName();
      mock.sobrenome = faker.person.lastName();
      return mock;
    }
  });

  for (let i = 0; i < mocks.length; i++) {
    if (i % 2 === 0) {
      await funcionarioRepository.save(mocks[i]);
    } else {
      await clienteRepository.save(mocks[i]);
    }
    const usuario = new Usuario();
    usuario.email = `${mocks[i].nome.toLowerCase()}.${mocks[i].sobrenome.toLowerCase()}.${faker.number.int({min: 1000, max: 9999})}@teste.com.br`;
    usuario.senha = '123456789';
    usuario.ativo = true;
    usuario.confirmado_em = new Date();
    usuario.perfil = mocks[i];
    await usuarioRepository.save(usuario);
  }


}