import { Pool } from "pg";


export const getUsers = async (
  limit: string = "10",
  offset: string = "0",
  pool: Pool
  ) => {
  const result = await pool.query("SELECT * FROM users LIMIT $1 OFFSET $2", [limit, offset]);
  return result.rows;
};

export const createUser = async (email: string, name: string, pool: Pool) => {
  const result = await pool.query(
    "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *",
    [email, name]
  );

  return result.rows[0];
};
