import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('tb_cargos', {})
export class Cargo {
  @PrimaryGeneratedColumn()
  public id?: number;
}