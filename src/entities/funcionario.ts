import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Pessoa} from "./pessoa";
import {Usuario} from "./usuario";

@Entity('tb_funcionarios', {})
export class Funcionario {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Pessoa, {cascade: true})
  @JoinColumn({name: "id_pessoa"})
  pessoa: Pessoa;

  @OneToOne(() => Usuario, {cascade: true})
  @JoinColumn({name: "id_usuario"})
  usuario: Usuario;

  @Column({type: 'varchar'})
  cargo: string;
}