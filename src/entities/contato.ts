import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Perfil} from "./perfil";

@Entity({name: 'contatos'})
export class Contato {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Perfil, (pessoa) => pessoa.enderecos, {nullable: false})
  @JoinColumn({name: "id_perfil"})
  perfil: Perfil;

  @Column({
    name: 'tipo',
    type: 'simple-enum',
    enum: ['email', 'telefone'],
    nullable: false
  })
  public tipo: string;

  @Column({
    name: 'contato',
    type: 'varchar',
    nullable: false,
  })
  public contato: string;
}