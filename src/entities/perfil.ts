import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Endereco} from "./endereco";

@Entity('tb_perfil', {})
export class Perfil {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  public nome: string;

  @Column({type: 'varchar'})
  public sobrenome: string;

  @Column({type: 'varchar'})
  public cpf: string;

  @OneToMany(() => Endereco, endereco => endereco.perfil, {cascade: false})
  enderecos: Endereco[];
}