import { Pool } from "pg";
import { user } from "../models/user.model";


export const getUsers = async (
  limit: string = "10",
  offset: string = "0",
  pool: Pool
  ) => {
  const result = await pool.query<user>("SELECT * FROM users LIMIT $1 OFFSET $2", [limit, offset]);
  return result.rows;
};
export const userExists = async (email: string, pool: Pool) => {
  const result = await pool.query<user>("SELECT * FROM users where email = $1", [email]);
  return result.rows;
}

export const createUser = async (email: string, name: string, pool: Pool) => {
  const result = await pool.query<user>(
    "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *",
    [email, name]
  );

  return result.rows[0];
};
