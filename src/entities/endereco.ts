import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Perfil} from "./perfil";

@Entity('tb_enderecos', {})
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Perfil, (pessoa) => pessoa.enderecos, {nullable: false})
  @JoinColumn({name: "id_perfil"})
  perfil: Perfil;

  @Column({type: 'varchar', length: 8, nullable: false})
  cep: string;

  @Column({type: 'varchar', length: 200, nullable: false})
  logradouro: string;

  @Column({type: 'varchar', length: 40, nullable: false})
  numero: string;

  @Column({type: 'varchar', length: 120, nullable: false})
  complemento: string;

  @Column({type: 'varchar', length: 200, nullable: true})
  bairro: string;

  @Column({type: 'varchar', length: 200, nullable: false})
  cidade: string;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
  })
  uf: string;
}