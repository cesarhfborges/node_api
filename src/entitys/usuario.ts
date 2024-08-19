import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

// import tokenHelper from '../helpers/token.helper';

@Entity('usuarios', {})
export class Usuario {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({type: 'varchar', nullable: false})
  public nome: string;

  @Column({type: 'varchar'})
  public sobrenome: string;

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

  // @BeforeInsert()
  // private hashPassword() {
  //   this.password = tokenHelper.encript(this.password);
  // }
}