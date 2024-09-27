import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Modelo} from "./modelo";

@Entity('tb_marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'varchar', nullable: false})
  nome: string;

  @OneToMany(() => Modelo, m => m.marca, {cascade: false})
  modelos?: Modelo[];
}