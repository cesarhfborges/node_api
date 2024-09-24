import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm';
import tokenHelper from "../helpers/token.helper";

@Entity('tb_usuarios', {})
@TableInheritance({column: {type: "varchar", name: "tipo_usuario"}})
export class Usuario {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', unique: true})
  public email: string;

  @Column({type: 'varchar', select: false})
  public senha: string;

  @Column({type: 'boolean', default: false})
  public ativo: boolean;

  // constructor(data?: {id?: number, firstName: string, lastName: string, email: string, password: string, isActive: boolean}) {
  //   if (data) {
  //     this.id = data.id;
  //     this.firstName = data.firstName;
  //     this.lastName = data.lastName;
  //     this.email = data.email;
  //     this.password = data.password;
  //     this.isActive = data.isActive;
  //   }
  // }

  // @OneToOne(() => Funcionario, {cascade: true, persistence: false})
  // funcionario?: Funcionario;
  @CreateDateColumn({name: 'created_at'})
  created_at: Date;
  @UpdateDateColumn({name: 'updated_at'})
  updated_at: Date;

  @BeforeInsert()
  private hashPassword() {
    this.senha = tokenHelper.encript(this.senha);
  }
}