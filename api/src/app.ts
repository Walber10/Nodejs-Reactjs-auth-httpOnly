import bodyParser from "body-parser";
import cookies from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middleware/error-handler";
import { rateLimiter } from "./middleware/rate-limiter";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_ALLOWED,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);
app.use(errorHandler);
app.use(rateLimiter);

app.use(errorHandler);

app.use("/api", routes);

export default app;
