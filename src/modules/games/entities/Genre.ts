import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genre: string;

  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];
}