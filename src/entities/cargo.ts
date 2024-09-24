import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('tb_cargos', {})
export class Cargo {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  public nome: string;
}