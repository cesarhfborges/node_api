import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Pessoa} from "./pessoa";
import {Usuario} from "./usuario";
import {Cargo} from "./cargo";

@Entity('tb_funcionarios', {})
export class Perfil {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Pessoa, {cascade: true})
  @JoinColumn({name: "id_pessoa"})
  pessoa: Pessoa;

  @OneToOne(() => Usuario, {cascade: false})
  @JoinColumn({name: "id_usuario"})
  usuario: Usuario;

  @OneToOne(() => Cargo, {cascade: false})
  @JoinColumn({name: "id_cargo"})
  cargo: Cargo;
}