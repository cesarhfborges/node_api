import {Repository} from "typeorm";
import {Endereco, Perfil, Usuario} from "../entities";
import {appDataSource} from "../database/datasource";
import {Funcionario} from "../entities/funcionario";

export async function usuariosSeeder() {
  const usuarioRepository: Repository<Usuario> = appDataSource.getRepository(Usuario);
  // const perfilRepository: Repository<Perfil> = appDataSource.getRepository(Perfil);
  const funcionarioRepository: Repository<Funcionario> = appDataSource.getRepository(Funcionario);
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
}