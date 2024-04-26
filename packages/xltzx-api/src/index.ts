import { startServer as startServerHttp } from "@/packages/_common/http";
import { startServer as startServerAdmin } from "@/packages/admin";
import { startServer as startServerStore } from "@/packages/store";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import { getLogger } from "./core/logger";
import "@/packages/_common/cron";
import pinoHttp from "pino-http";
import redisClient from "./core/redis";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
  await redisClient.connect();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // log
  app.use(
    pinoHttp({
      formatters: {
        level: label => {
          return { level: label.toUpperCase() };
        }
      },
      timestamp: () => `,"timestamp":"${new Date(Date.now()).toLocaleString()}"`
    })
  );

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  await startServerAdmin(app);
  await startServerStore(app);
  startServerHttp(app);

  app.listen(port, () => {
    console.log(`🚀 Express ready at http://localhost:${port}`);
  });
};

startServer();
