import { Request, Response } from "express";
import { createNewUser } from "../users";
import prisma from "../../modules/db";

jest.mock("../../modules/auth", () => ({
  createJWT: jest.fn(),
  hashPassword: jest.fn(),
}));
jest.mock("../../modules/db", () => () => ({
  user: {
    create: jest.fn().mockReturnValue({
      id: "1234",
      createdAt: "1234",
      username: "user",
      password: "hashed",
    }),
  },
}));
describe("User Handlers", () => {
  describe("createUser()", () => {
    it("should create a new user", async () => {
      const req = {
        body: {
          username: "user",
          password: "qwerty",
        },
      } as Request;

      const res = {
        status: jest.fn(),
        json: jest
          .fn()
          .mockReturnValue({ message: "user created", token: "12343" }),
      } as unknown as Response;
      const newUser = await createNewUser(req, res, () => {});
    });
  });
});
