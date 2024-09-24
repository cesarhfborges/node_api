import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Pessoa} from "./pessoa";

@Entity('tb_enderecos', {})
export class Endereco {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  rua: string;

  @Column({type: 'varchar', nullable: false})
  numero: string;

  @Column({type: 'varchar', nullable: false})
  cidade: string;

  @Column({type: 'varchar', nullable: false})
  estado: string;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.enderecos)
  pessoa: Pessoa;
}