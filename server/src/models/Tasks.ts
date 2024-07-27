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
