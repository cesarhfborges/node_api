import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Marca} from "./marca";

@Entity('tb_modelos')
export class Modelo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'varchar', nullable: false})
  nome: string;

  @ManyToOne(() => Marca, m => m.modelos, {nullable: false})
  @JoinColumn({name: 'id_marca'})
  marca: Marca
}