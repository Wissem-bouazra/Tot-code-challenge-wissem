import express, { Request, Response } from "express";
import { getUsers } from "../services/userService";
import { pool } from "..";

export const userRouter = express.Router()
 
userRouter.get("/", async (_: Request, res: Response) => {
    const users = await getUsers(pool);
    return res.status(200).json(users);
  });