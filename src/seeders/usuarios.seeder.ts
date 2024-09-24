import {Repository} from "typeorm";
import {Cargo, Endereco, Funcionario, Perfil, Usuario} from "../entities";
import {appDataSource} from "../database/datasource";

export async function usuariosSeeder() {
  const funcionarioRepository: Repository<Funcionario> = appDataSource.getRepository(Funcionario);
  const cargoRepository: Repository<Cargo> = appDataSource.getRepository(Cargo);
  const enderecoRepository: Repository<Endereco> = appDataSource.getRepository(Endereco);

  const p = new Perfil();
  p.nome = "Administrador";
  p.sobrenome = "";
  p.cpf = "00000000000";

  const u = new Usuario();
  u.email = "admin@admin.com";
  u.senha = "12345678";

  const f = new Funcionario();
  f.perfil = p;
  f.usuario = u;

  const cargos = await cargoRepository.find();

  f.cargo = cargos[0];

  const saved = await funcionarioRepository.save(f);

  const endereco = new Endereco();
  endereco.perfil = saved.perfil;
  endereco.cep = "72009001";
  endereco.logradouro = "RUA 99 CONJUNTO 10 CASA 77";
  endereco.numero = "77";
  endereco.complemento = "Casa 77";
  endereco.bairro = "Samambaia";
  endereco.cidade = "Brasilia";
  endereco.uf = "DF";

  await enderecoRepository.save(endereco);
}