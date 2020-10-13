import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/models/User';

@Entity('appointments')
class AppointmentFormat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // passar como parametro uma função que retorna qual o model que ele dve utilizar quando essa variavel for chamada
  @JoinColumn({ name: 'provider_id' }) // qual é a coluna que vai identificar qual é o prestador desse agendamento
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User) // passar como parametro uma função que retorna qual o model que ele dve utilizar quando essa variavel for chamada
  @JoinColumn({ name: 'user_id' }) // qual é a coluna que vai identificar qual é o prestador desse agendamento
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentFormat;
