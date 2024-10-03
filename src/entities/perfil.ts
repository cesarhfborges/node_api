import {BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Endereco, Usuario, Contato} from "./";

@Entity('tb_perfil', {})
@TableInheritance({
  column: {
    type: "varchar",
    name: "tipo_perfil",
    default: 'cliente',
    nullable: true
  }
})
export abstract class Perfil extends BaseEntity {
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