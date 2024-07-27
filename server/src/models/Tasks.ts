import mongoose from "mongoose";

interface ITaskSchema {
  title: string;
  description?: string;
  status: string;
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: Date;
  user: mongoose.Types.ObjectId;
}

const TaskSchema = new mongoose.Schema<ITaskSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent"],
    },
    deadline: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);
