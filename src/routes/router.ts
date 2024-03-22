import express from "express";
import { userRouter } from "./user.route";
import { reservationRouter } from "./reservation.route";





export const router = express.Router()
router.use('/reservations', reservationRouter)
router.use('/users', userRouter)
