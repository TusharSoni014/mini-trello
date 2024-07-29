/**
 * Main server file for the application.
 * 
 * This file sets up the Express server, configures middleware,
 * connects to the database, and defines the main routes.
 */

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
import { tasksRouter } from "./routes/tasksRouter";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL!,
  })
);

// Load environment variables
config();

// Routes
app.use("/user", userRouter);
app.use("/task", tasksRouter);

// Connect to database
dbConnect();

// Start server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
