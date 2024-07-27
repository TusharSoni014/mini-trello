import { Response } from "express";
import { AuthRequest } from "../middlewares/verifyToken";
import { Task } from "../models/Tasks";
import { User } from "../models/User";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const userId = req._id;
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: userId,
    });
    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const editNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, deadline } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority, deadline },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req._id;
    const notes = await Task.find({ user: userId, isDeleted: false });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};
