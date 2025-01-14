import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
      .where('LOWER(games.title) LIKE LOWER(:param)', {param: `%${param}%`})
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`
      SELECT COUNT(*)
      FROM games
      `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const rawUsers = await this.repository
    .createQueryBuilder('games')
    .innerJoin('users_games_games', 'ugg', 'ugg.gamesId = games.id')
    .innerJoinAndSelect('users', 'users', 'users.id = ugg.usersId')
    .where('games.id = :id', { id })
    .select([
      'users.first_name', 
      'users.last_name', 
      'users.email', 
    ])
    .getRawMany();

    return rawUsers.map((rawUser) => ({
      first_name: rawUser.users_first_name,
      last_name: rawUser.users_last_name,
      email: rawUser.users_email,
    })) as User[];
      // Complete usando query builder
  }
}
