import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  createNote,
  deleteNote,
  editNote,
  getAllNotes,
} from "../controllers/tasksController";

export const tasksRouter = express.Router();

// Apply verifyToken middleware to all routes
tasksRouter.use(verifyToken);

tasksRouter.post("/create", createNote);
tasksRouter.put("/edit/:id", editNote);
tasksRouter.get("/all", getAllNotes);
tasksRouter.delete("/delete/:id", deleteNote);