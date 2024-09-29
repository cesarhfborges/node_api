import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import tokenHelper from "../helpers/token.helper";
import {Perfil} from "./perfil";
import {Funcionario} from "./funcionario";
import {Cliente} from "./cliente";
import {Grupo} from "./grupo";
import {Permissao} from "./permissao";

@Entity('tb_usuarios', {})
export class Usuario {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Perfil, u => u.usuario, {nullable: false, eager: true})
  @JoinColumn({name: 'id_perfil'})
  perfil: Perfil;

  @Column({type: 'varchar', unique: true})
  public email: string;

  @Column({type: 'varchar', select: false})
  public senha: string;

  @Column({type: 'boolean', default: true})
  public ativo: boolean;

  @Column({type: 'datetime', nullable: true})
  public confirmado_em: Date | null;

  @Column({type: 'varchar', select: false, nullable: true, unique: true})
  public codigo_confirmacao: string | null;

  @Column({type: 'datetime', select: false, nullable: true})
  public confirmacao_expiracao: Date | null;

  @CreateDateColumn({name: 'criado_em'})
  public criado_em?: Date;

  @UpdateDateColumn({name: 'atualizado_em'})
  public atualizado_em?: Date;

  @ManyToMany(() => Grupo, {eager: true})
  @JoinTable({
    name: 'tb_usuarios_grupos',
    joinColumn: {name: 'id_usuario', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'id_grupo', referencedColumnName: 'id'},
  })
  grupos: Grupo[];

  @ManyToMany(() => Permissao, {eager: true})
  @JoinTable({
    name: 'tb_usuarios_permissoes',
    joinColumn: {name: 'id_usuario', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'id_permissao', referencedColumnName: 'id'},
  })
  permissoes: Permissao[];

  public get isFuncionario(): boolean {
    if (!!this.perfil) {
      return this.perfil instanceof Funcionario;
    }
    throw new Error('Perfil is not set.');
  }

  public get isCliente(): boolean {
    if (!!this.perfil) {
      return this.perfil instanceof Cliente;
    }
    throw new Error('Perfil is not set.');
  }

  public get tipoPerfil(): 'cliente' | 'funcionario' {
    if (!!this.perfil) {
      return this.isCliente ? 'cliente' : 'funcionario';
    }
    throw new Error('Perfil is not set.');
  }

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword?() {
    if (!!this.senha && this.senha.length > 0) {
      this.senha = tokenHelper.encript(this.senha);
    }
  }
}