import { Response } from "express";
import { AuthRequest } from "../middlewares/verifyToken";
import { Task } from "../models/Tasks";
import { User } from "../models/User";

/**
 * Creates a new task in the database.
 *
 * @param req - The authenticated request object, containing the task data in the request body.
 * @param res - The response object, which will be used to send the created task back to the client.
 * @returns A JSON response containing the created task.
 * @throws {Error} If there is an error creating the task.
 */
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

/**
 * Updates an existing task in the database.
 *
 * @param req - The authenticated request object, containing the task ID in the request parameters and the updated task data in the request body.
 * @param res - The response object, which will be used to send the updated task back to the client.
 * @returns A JSON response containing the updated task.
 * @throws {Error} If there is an error updating the task.
 */
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

/**
 * Retrieves all notes for the authenticated user that have not been deleted.
 *
 * @param req - The authenticated request object, containing the user ID.
 * @param res - The response object, which will be used to send the retrieved notes back to the client.
 * @returns A JSON response containing an array of all notes for the authenticated user that have not been deleted.
 * @throws {Error} If there is an error fetching the notes.
 */
export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req._id;
    const notes = await Task.find({ user: userId, isDeleted: false });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

/**
 * Deletes an existing task from the database.
 *
 * @param req - The authenticated request object, containing the task ID in the request parameters.
 * @param res - The response object, which will be used to send a success message back to the client.
 * @returns A JSON response indicating that the task was deleted successfully.
 * @throws {Error} If there is an error deleting the task.
 */
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
