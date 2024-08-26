import { Client } from "pg";

export const sql = new Client({
  host: String(Bun.env.PGHOST),
  port: Number(Bun.env.PGPORT),
  user: String(Bun.env.PGUSER),
  password: String(Bun.env.PGPASSWORD),
  database: String(Bun.env.PGDATABASE),
});