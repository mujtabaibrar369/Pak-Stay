import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingRoute from "./routes/booking.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import OpenAI from "openai";

const app = express();
app.use(express.json());

dotenv.config();
const openai = new OpenAI();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/booking", bookingRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body.message;
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
    });
    console.log(completion.choices[0].message.content);
    res.json("ok");
  } catch (err) {
    console.error(`Error: ${err}`);
    res.send(err);
  }
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
