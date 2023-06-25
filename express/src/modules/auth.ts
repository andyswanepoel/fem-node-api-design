import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { RequestHandler } from "express";
import type { User } from "@prisma/client";

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

const validateJWTUserFields = (user) => {
  if (true) {
    return user as { id: string; username: string };
  } else {
    throw new Error("Malformed user token.");
  }
};

export const protect: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "No authorization header provided." });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "No authorization token provided." });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const validatedUser = validateJWTUserFields(user);

    req.user = validatedUser;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "Invalid token." });
    return;
  }
};

export const comparePasswords = (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, parseInt(process.env.SALT_VALUE));
};
