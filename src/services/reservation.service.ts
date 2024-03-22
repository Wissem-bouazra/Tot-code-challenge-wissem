import { Pool } from "pg";
import { reservation } from "../moodels/reservation.model";


export const getReservationsByRange = async (
  startTime: string | undefined,
  endTime: string | undefined,
  limit: string = "5",
  offset: string = "0",
  pool: Pool
) => {
  const result = startTime && endTime ? await pool.query<reservation>(
          "SELECT * FROM reservations where startTime >= $1 and endTime <= $2 LIMIT $3 OFFSET $4",
          [startTime, endTime, limit, offset]
        ) : await pool.query<reservation>(
          "SELECT * FROM reservations LIMIT $1 OFFSET $2", [limit, offset,]
        );
  return result.rows;
};

export const getReservationsByTime = async (startTime: string, pool: Pool) => {
  const result = await pool.query<reservation>(
    "SELECT * FROM reservations where startTime = $1",
    [startTime]
  );
  return result.rows;
};

export const createReservation = async (
  email: string,
  startTime: string,
  endTime: string,
  pool: Pool
) => {
  const result = await pool.query<reservation>(
    "INSERT INTO reservations (userEmail, startTime, endTime) VALUES ($1, $2, $3) RETURNING *",
    [email, startTime, endTime]
  );

  return result.rows[0];
};
