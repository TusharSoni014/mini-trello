import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

/**
 * Extends the Express `Request` interface to include an optional `_id` property.
 * This property is used to store the user's ID from the verified JWT token.
 */
export interface AuthRequest extends Request {
  _id?: string;
}

/**
 * Middleware function to verify the JWT token in the user's cookie.
 *
 * This middleware function is used to verify the JWT token in the user's cookie.
 * If the token is valid, the middleware will set the `_id` property on the `req` object
 * with the user's ID from the token payload. If the token is not valid or not present,
 * the middleware will return a 401 Unauthorized response.
 *
 * @param req - The Express request object, extended with the `AuthRequest` interface.
 * @param res - The Express response object.
 * @param next - The Express next middleware function.
 */
export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "You are unauthorized." });
  }
  jwt.verify(
    token,
    process.env.JWT_KEY!,
    (err: JsonWebTokenError | null, data: any) => {
      if (err) {
        return res.status(401).send({ message: "You are unauthorized." });
      }
      req._id = data._id;
      next();
    }
  );
};
