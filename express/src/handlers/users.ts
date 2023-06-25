import { RequestHandler } from "express";
import prisma from "../modules/db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.status(201);
    res.json({ message: "user created", token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(401);
      return res.json({ message: "No user found." });
    }

    const isPasswordValid = await comparePasswords(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401);
      return res.json({ message: "Incorrect password." });
    }

    const token = createJWT(user);

    res.status(201);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
