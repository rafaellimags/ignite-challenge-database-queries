import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/User';
import { Genre } from './Genre';
import { Order } from './Order';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable()
  genres: Genre[]

  @ManyToMany(() => Order, (order) => (order.games))
  orders: Order[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
