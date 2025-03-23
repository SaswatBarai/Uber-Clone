import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import captainRouter from "./routes/captainRoute.js";
import ConnectDB from "./config/connectDB.js";
ConnectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure this is before the routes
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/user", userRouter);
app.use("/captain", captainRouter);

export default app;
