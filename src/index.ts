import express, { Express, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import { createUser, getUsers } from "./services/userService";
import { NUMBER_OF_TABLES } from "./constants";
import {
  createReservation,
  getReservationsByRange,
  getReservationsByTime,
} from "./services/reservationService";
import bodyParser from "body-parser";
import { z } from "zod";
import { router } from "./routes/router";

dotenv.config();

export const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: 5432,
  ssl: true,
});

const app: Express = express();
const port = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome page");
});

// app.get("/users", async (_: Request, res: Response) => {
//   const users = await getUsers(pool);
//   return res.status(200).json(users);
// });

// app.post("/reservations", async (req: Request, res: Response) => {

//   const data = z.object({
//     name: z.string({
//       required_error: "Name is required",
//       invalid_type_error: "Name must be a string",
//     }),
//     email: z.string().email({ message: "Invalid email address" }),
//     startTime: z.string({
//       required_error: "Please select a date and time",
//       invalid_type_error: "That's not a date!"
//     }),
//     endTime: z.string({
//       required_error: "Please select a date and time",
//       invalid_type_error: "That's not a date!"
//     })
//   })
//   const reservation = data.parse(req.body)
//   // const { name, email, startTime, endTime } = req.body;

//   const currentReservations = await getReservationsByTime(reservation.startTime.toString(), pool);

//   if (currentReservations.length < NUMBER_OF_TABLES) {
//     await createUser(reservation.email, reservation.name, pool);
//     await createReservation(reservation.email, reservation.startTime.toString(), reservation.endTime.toString(), pool);

//     return res.status(200).json({
//       message: "Reservation created successfully",
//     });
//   }

//   return res.status(200).json({
//     message: "Restaurent is fully booked, reservation unsuccessful",
//   });
// });

// app.get("/reservations", async (req: Request, res: Response) => {
//   const reservations = await getReservationsByRange(
//     req.query.startTime as string,
//     req.query.endTime as string,
//     req.query.limit as string,
//     req.query.offset as string,
//     pool
//   );

//   return res.status(200).json(reservations);
// });

// routes
app.use(router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
