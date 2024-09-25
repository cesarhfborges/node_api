import {Repository} from "typeorm";
import {Endereco, Perfil, Usuario} from "../entities";
import {appDataSource} from "../database/datasource";

export async function usuariosSeeder() {
  const usuarioRepository: Repository<Usuario> = appDataSource.getRepository(Usuario);
  const perfilRepository: Repository<Perfil> = appDataSource.getRepository(Perfil);
  const enderecoRepository: Repository<Endereco> = appDataSource.getRepository(Endereco);

  const p = new Perfil();
  p.nome = 'administrador';
  p.sobrenome = "";
  p.cpf = "00000000000";
  const perfil = await perfilRepository.save(p);


  const u = new Usuario();
  u.email = "admin@admin.com";
  u.senha = "12345678";
  u.perfil = p;
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