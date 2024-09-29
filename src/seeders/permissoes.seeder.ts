import {Repository} from "typeorm";
import {appDataSource} from "../database/datasource";
import {Grupo} from "../entities/grupo";
import {Permissao} from "../entities/permissao";

interface Role {
  chave: string;
  permissoes: string[]
}

const GRUPOS: string[] = [
  'Clientes',
  'Administradores',
  'Scrum master',
  'Técnicos',
  'Programadores',
  'Analistas'
];

const PERMISSOES: Role[] = [
  {
    chave: 'cliente',
    permissoes: [
      'create',
      'read',
      'update',
      'delete',
    ]
  },
  {
    chave: 'administrador',
    permissoes: [
      'create',
      'read',
      'update',
      'delete',
    ]
  },
  // {
  //   chave: 'chamados',
  //   permissoes: [
  //     'open',
  //     'close'
  //   ]
  // }
];

export default async function permissoesSeeder() {
  const permissaoRepository: Repository<Permissao> = appDataSource.getRepository(Permissao);
  const grupoRepository: Repository<Grupo> = appDataSource.getRepository(Grupo);

  let listaPermissoes = [];

  // for (const permissao of PERMISSOES) {
  //   if (!!PERMISSOES[0].permissoes) {
      for (const p of PERMISSOES[0].permissoes) {
        const chave = `${PERMISSOES[0].chave}:${p}`;
        const pe = await permissaoRepository.save({
          descricao: `Permissao para efetuar ${p} em ${PERMISSOES[0].chave}(es).`,
          chave: chave,
        });
        listaPermissoes.push(pe);
      }
    // }
  // }

  for (let grupo of GRUPOS) {
    const a = await grupoRepository.save({
      nome: grupo,
      permissoes: listaPermissoes
    });
  }
}