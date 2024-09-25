import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Endereco} from "./endereco";
import {Usuario} from "./usuario";
import {Contato} from "./contato";

@Entity('tb_perfil', {})
export class Perfil {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  public nome: string;

  @Column({type: 'varchar', nullable: true})
  public sobrenome: string;

  @Column({
    type: 'varchar',
    length: 14,
    unique: true,
    nullable: true,
  })
  public cpf: string;

  @OneToOne(() => Usuario, u => u.perfil, {cascade: false})
  usuario: Usuario;

  @OneToMany(() => Endereco, endereco => endereco.perfil, {cascade: false})
  enderecos: Endereco[];

  @OneToMany(() => Contato, u => u.perfil, {cascade: false})
  contatos: Contato[];
}