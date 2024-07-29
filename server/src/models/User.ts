import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  email: string;
  password: string;
  picture: string;
  tasks: Array<mongoose.Types.ObjectId>;
}

/**
 * Defines the schema for the User model in the application's MongoDB database.
 * The schema includes the following fields:
 * - `username`: A required string field that must be unique.
 * - `email`: A required string field that must be unique.
 * - `password`: A required string field.
 * - `picture`: A string field that defaults to a default avatar image.
 * - `tasks`: An array of ObjectId references to Task documents.
 * The schema also includes timestamps for when the document was created and last updated.
 */
const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
