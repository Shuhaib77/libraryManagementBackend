import express from "express";
import cors from "cors";
import { Db } from "../config/connectDb.js";
import userRoute from "./routes/authRoute.js";
import bookRoute from "./routes/bookRoute.js";
import borrowRoute from "./routes/borrowRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", userRoute);
app.use("/api", bookRoute);
app.use("/api", borrowRoute);
Db();

export default app;
