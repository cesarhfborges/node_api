import {ChildEntity, Column, Entity} from "typeorm";
import {Perfil} from "./perfil";

@ChildEntity('funcionario')
export class Funcionario extends Perfil {
  @Column({type: 'varchar', nullable: true})
  cargo: string;
}