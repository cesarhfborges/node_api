import {Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {Pessoa} from "./pessoa";
import {Usuario} from "./usuario";


@Entity({name: "tb_clientes"})
export class Cliente {

  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Usuario, {cascade: true})
  @JoinColumn({name: "id_usuario"})
  usuario: Usuario;

  @OneToOne(() => Pessoa, {cascade: true})
  @JoinColumn({name: "id_pessoa"})
  pessoa: Pessoa;

  // @PrimaryGeneratedColumn()
  // id: string;
  //
  // @Column({type: 'varchar'})
  // nome: string;
  //
  // @Column({type: 'varchar'})
  // sobrenome: string;
  //
  // @Column({type: 'varchar', nullable: true, unique: true})
  // cpf_cnpj: string;
  //
  // @Column({type: 'varchar'})
  // cep: string;
  //
  // @Column({type: 'varchar'})
  // logradouro: string;
  //
  // @Column({type: 'varchar'})
  // bairro: string;
  //
  // @Column({type: 'varchar'})
  // numero: string;
  //
  // @Column({type: 'varchar'})
  // cidade: string;
  //
  // @Column({type: 'varchar'})
  // uf: string;
  //
  // @Column({type: 'varchar'})
  // telefone: string;
  //
  // @CreateDateColumn({name: 'created_at'})
  // created_at: Date;
  //
  // @UpdateDateColumn({name: 'updated_at'})
  // updated_at: Date;
}
