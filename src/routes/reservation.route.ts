import { z } from "zod";
import { pool } from "..";
import { NUMBER_OF_TABLES } from "../constants";
import { createReservation, getReservationsByRange, getSpotsAvailable } from "../services/reservation.service";
import { createUser, userExists } from "../services/user.service";
import express, { Request, Response } from "express";
import { addHours } from 'date-fns';


export const reservationRouter = express.Router()

reservationRouter.post("/create", async (req: Request, res: Response) => {
    const data = z.object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }),
      email: z.string().email({ message: "Invalid email address" }),
      startTime: z.string({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!"
      }),
      numberOfSpots: z.number()
    })
    const reservation = data.parse(req.body)
    const start = new Date(reservation.startTime)
    const end = addHours(start, 1)
    if (start.getHours() >= 19 && start.getHours() <= 23) {
      const totalSpots = await getSpotsAvailable(start.toISOString(), pool)
      const spotsAvailable =  (NUMBER_OF_TABLES - (Math.round(totalSpots[0].total / 4)))
      if (spotsAvailable > 0 && spotsAvailable < 6) {
        if((await userExists(reservation.email, pool)).length === 0) {
          await createUser(reservation.email, reservation.name, pool);
          await createReservation(reservation.email, start.toISOString(), end.toISOString(), reservation.numberOfSpots, pool);
          return res.status(200).json({
              message: "Reservation created successfully",
          });
        }
        await createReservation(reservation.email, start.toISOString(), end.toISOString(), reservation.numberOfSpots, pool);
          return res.status(200).json({
              message: "Thank you for choosing our restaurent again",
          });
      }
      return res.json({
      message: "Restaurent is fully booked, reservation unsuccessful",
      });
    }
    return res.json({
        message: "Restaurent is closed at this time please chose a time between 19h and 23h"
    })
});
  
reservationRouter.get("/", async (req: Request, res: Response) => {
    const reservations = await getReservationsByRange(
      req.query.startTime as string,
      req.query.endTime as string,
      req.query.limit as string,
      req.query.offset as string,
      pool
    );
    return res.status(200).json(reservations);
});