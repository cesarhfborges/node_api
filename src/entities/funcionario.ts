import {ChildEntity, JoinColumn, OneToOne} from "typeorm";
import {Perfil} from "./perfil";
import {Cargo} from "./cargo";

@ChildEntity('funcionario')
export class Funcionario extends Perfil {

  @OneToOne(() => Cargo, {nullable: true})
  @JoinColumn({name: 'id_cargo'})
  cargo: string;
}