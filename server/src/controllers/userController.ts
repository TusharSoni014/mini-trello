import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from "../middlewares/verifyToken";
import { Task } from "../models/Tasks";

/**
 * Registers a new user with the provided username, email, and password.
 *
 * @param req - The HTTP request object containing the user's registration details.
 * @param res - The HTTP response object to send the registration result.
 * @returns A JSON response containing the new user's username, picture, and email if the registration is successful. Otherwise, it returns an error message.
 */
export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists!" });
    }
    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .send({ message: "Some characters are not allowed!" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const categories = ["todo", "under-review", "in-progress", "done"];

    for (const category of categories) {
      await Task.create({
        title: `Sample ${category} task`,
        description: `This is a sample ${category} task.`,
        status: category,
        user: user._id,
        priority: "low",
      });
    }

    return res.status(201).send({
      username: user.username,
      picture: user.picture,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error signing up!", error: error });
  }
};

/**
 * Authenticates a user and returns a JWT token.
 *
 * @param req - The HTTP request object containing the user's credentials (userId and password).
 * @param res - The HTTP response object to send the authentication token.
 * @returns A JSON response containing the user's username, picture, email, tasks, and a JWT token.
 */
export const login = async (req: Request, res: Response) => {
  const { userId, password }: { userId: string; password: string } = req.body;
  try {
    let existingUser = undefined;

    if (userId.includes("@")) {
      existingUser = await User.findOne({ email: userId });
    } else {
      existingUser = await User.findOne({ username: userId });
    }

    if (!existingUser) {
      return res.status(400).send({ message: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).send({ message: "wrong password" });
    }

    const jwtToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).send({
      username: existingUser.username,
      picture: existingUser.picture,
      email: existingUser.email,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error log in!", error: error });
  }
};

/**
 * Logs out the current user by clearing the authentication token cookie.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response indicating that the user has been logged out successfully.
 */
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "logged out successfully!" });
  } catch (error) {
    return res.status(500).send({ message: "Error logging out!", error });
  }
};

/**
 * Retrieves the details of the authenticated user.
 *
 * @param req - The authenticated request object.
 * @param res - The response object.
 * @returns A JSON response containing the user's username, picture, email, and tasks.
 */
export const userDetails = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Cannot find the user!" });
    }
    return res.status(200).send({
      username: user.username,
      picture: user.picture,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send({ message: "Cannot fetch user details" });
  }
};
