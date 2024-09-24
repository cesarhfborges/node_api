import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Endereco} from "./endereco";

@Entity('tb_pessoas', {})
export class Pessoa {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  public nome: string;

  @Column({type: 'varchar'})
  public sobrenome: string;

  @Column({type: 'varchar'})
  public cpf: string;

  @OneToMany(() => Endereco, endereco => endereco.pessoa, {cascade: false})
  enderecos: Endereco[];
}