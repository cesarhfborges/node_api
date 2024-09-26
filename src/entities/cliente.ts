import {ChildEntity} from "typeorm";
import {Perfil} from "./perfil";

@ChildEntity('cliente')
export class Cliente extends Perfil {
}