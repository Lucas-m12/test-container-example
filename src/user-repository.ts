import { Client } from "pg";
import { User } from "./user-entity";

export interface UserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}

export class PGUserRepository implements UserRepository {
  constructor(
    private sql: Client
  ) {}

  async create(user: User): Promise<void> {
    const { email, id, name, password } = user;
    const sql = "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)";
    await this.sql.query(sql, [id, name, email, password]);
  }

  async findAll(): Promise<User[]> {
    const sql = "SELECT * FROM users LIMIT 10";
    const users = (await this.sql.query<UsersDB>(sql)).rows;
    return users.map((user) => new User(
      user.name,
      user.email,
      user.password,
      user.id
    ));
  }

  async findById(id: string): Promise<User> {
    const sql = "SELECT * FROM users WHERE id = $1";
    const user = (await this.sql.query<UsersDB>(sql, [id])).rows[0];
    return new User(user.name, user.email, user.password, user.id);
  }
}

interface UsersDB {
  id: string;
  name: string;
  email: string;
  password: string;
}