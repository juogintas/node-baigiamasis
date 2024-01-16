import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ticketRouter from "./src/routes/ticket.js";
import userRouter from "./src/routes/user.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use(ticketRouter);

app.use(userRouter);

app.listen(process.env.PORT);
