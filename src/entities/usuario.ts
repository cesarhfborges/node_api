import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm';
import tokenHelper from "../helpers/token.helper";
import {Perfil} from "./perfil";

@Entity('tb_usuarios', {})
@TableInheritance({column: {type: "varchar", name: "tipo_usuario", nullable: true}})
export class Usuario {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', unique: true})
  public email: string;

  @Column({type: 'varchar', select: false})
  public senha: string;

  @Column({type: 'boolean', default: false})
  public ativo: boolean;

  @CreateDateColumn({name: 'created_at'})
  created_at?: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updated_at?: Date;

  @OneToOne(() => Perfil, u => u.usuario, {cascade: false})
  @JoinColumn({name: 'id_perfil'})
  perfil: Perfil;

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword?() {
    this.senha = tokenHelper.encript(this.senha);
  }
}