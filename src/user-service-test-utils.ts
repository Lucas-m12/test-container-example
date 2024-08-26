import { Client } from "pg";

export const createUsersTable = async (pgClient: Client) => {
  console.log("creating table users");
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `;
  await pgClient.query(sql);
};