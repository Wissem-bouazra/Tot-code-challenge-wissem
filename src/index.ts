import express, { Express, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router } from "./routes/router";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json'; // Path to your OpenAPI Specification file

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// routes
app.use(router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
