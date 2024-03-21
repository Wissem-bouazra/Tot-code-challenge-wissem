import { z } from "zod";
import { pool } from "..";
import { NUMBER_OF_TABLES } from "../constants";
import { createReservation, getReservationsByRange, getReservationsByTime } from "../services/reservationService";
import { createUser } from "../services/userService";
import express, { Request, Response } from "express";

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
      endTime: z.string({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!"
      })
    })
    const reservation = data.parse(req.body)
    // const { name, email, startTime, endTime } = req.body;
  
    const currentReservations = await getReservationsByTime(reservation.startTime.toString(), pool);
  
    if (currentReservations.length < NUMBER_OF_TABLES) {
      await createUser(reservation.email, reservation.name, pool);
      await createReservation(reservation.email, reservation.startTime.toString(), reservation.endTime.toString(), pool);
  
      return res.status(200).json({
        message: "Reservation created successfully",
      });
    }
  
    return res.status(200).json({
      message: "Restaurent is fully booked, reservation unsuccessful",
    });
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