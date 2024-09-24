import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Endereco} from "./endereco";
import {Usuario} from "./usuario";
import {format} from "date-fns";

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
    length: 11,
    unique: true,
    // transformer: {
      // from: (value: string) => format(value, 'yyyy-MM-dd\'T\'HH:mm:ss'),
      // to: (value: string) => new Date(value),
    // },
  })
  public cpf: string;

  @OneToOne(() => Usuario, u => u.perfil, {cascade: false})
  usuario: Usuario;

  @OneToMany(() => Endereco, endereco => endereco.perfil, {cascade: false})
  enderecos: Endereco[];
}