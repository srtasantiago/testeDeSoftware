import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column()
  dono: string;

  @Column()
  user_id: string;

  @Column({ type: 'text' })
  endereco: string;

  @Column({ length: 32 })
  contato: string;

  @Column({ length: 255 })
  referencia: string;

  @Column({ length: 255 })
  status: string;

  @Column({ type: 'text', nullable: true })
  imagem_url: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @ManyToOne(() => User, (user) => user.animais)
  @JoinColumn({ name: 'user_id' })
  usuario: User;
}
