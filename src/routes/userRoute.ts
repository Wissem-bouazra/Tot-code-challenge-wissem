import express, { Request, Response } from "express";
import { getUsers } from "../services/userService";
import { pool } from "..";

export const userRouter = express.Router()
 
userRouter.get("/", async (req: Request, res: Response) => {
    const users = await getUsers(
        req.query.limit as string,
        req.query.offset as string,
        pool
        );
    return res.status(200).json(users);
});