import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('tb_cargos', {})
export class Cargo extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  public nome: string;
}