import mongoose from "mongoose";

interface ITaskSchema {
  title: string;
  description?: string;
  status: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  user: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

/**
 * Defines the schema for a Task document in the MongoDB database.
 * The schema includes fields for the task title, status, user, description, priority, deadline, and whether the task is deleted.
 * The schema also includes timestamps for when the task was created and last updated.
 */
const TaskSchema = new mongoose.Schema<ITaskSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["todo", "under-review", "in-progress", "done"],
      default: "todo",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "urgent"],
    },
    deadline: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);
