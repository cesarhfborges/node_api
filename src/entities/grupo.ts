import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permissao} from "./permissao";

@Entity({name: 'tb_grupos'})
export class Grupo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'nome', type: 'varchar', length: 50})
  nome: string;

  @ManyToMany(() => Permissao, {eager: true})
  @JoinTable({
    name: 'tb_grupos_permissoes',
    joinColumn: {name: 'id_grupo', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'id_permissao', referencedColumnName: 'id'},
  })
  permissoes: Permissao[];
}