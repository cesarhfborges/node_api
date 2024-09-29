import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'tb_permissoes'})
export class Permissao {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'chave', type: 'varchar', length: 50, unique: true})
  chave: string;

  @Column({name: 'descricao', type: 'varchar', length: 100})
  descricao: string;
}