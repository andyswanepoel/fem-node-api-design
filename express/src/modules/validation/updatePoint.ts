import { body } from "express-validator";
import { UPDATE_STATUS } from "@prisma/client";
import { validate } from "./validation";

const updatePointPostValidators = [
  body("name").isString().notEmpty().withMessage("Missing update point name."),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Missing update point description."),
  body("updateId").isString().withMessage("Missing update ID."),
];

const updatePointPutValidators = [
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Missing update point name."),
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Missing update point description."),
];

export const updatePointPostValidation = [
  ...updatePointPostValidators,
  validate,
];
export const updatePointPutValidation = [...updatePointPutValidators, validate];
