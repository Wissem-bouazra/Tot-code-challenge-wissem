import express from "express";
import { userRouter } from "./userRoute";
import { reservationRouter } from "./reservationRoute";





export const router = express.Router()
router.use('/reservations', reservationRouter)
router.use('/users', userRouter)
