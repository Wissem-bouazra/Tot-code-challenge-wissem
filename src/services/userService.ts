import { Pool } from "pg";


export const getUsers = async (pool: Pool) => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const createUser = async (email: string, name: string, pool: Pool) => {
  const result = await pool.query(
    "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *",
    [email, name]
  );

  return result.rows[0];
};
