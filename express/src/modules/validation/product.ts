import { body } from "express-validator";
import { validate } from "./validation";

const productValidators = [
  body("name").isString().notEmpty().withMessage("Missing product name."),
];

export const productValidation = [...productValidators, validate];
