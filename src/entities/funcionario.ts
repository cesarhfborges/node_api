import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Perfil} from "./perfil";
import {Usuario} from "./usuario";
import {Cargo} from "./cargo";

@Entity('tb_funcionarios', {})
export class Funcionario {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Perfil, {cascade: true})
  @JoinColumn({name: "id_perfil"})
  perfil: Perfil;

  @OneToOne(() => Usuario, {cascade: true})
  @JoinColumn({name: "id_usuario"})
  usuario: Usuario;

  @OneToOne(() => Cargo, {cascade: true})
  @JoinColumn({name: "id_cargo"})
  cargo: Cargo;
}