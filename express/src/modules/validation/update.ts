import { body } from "express-validator";
import { UPDATE_STATUS } from "@prisma/client";
import { validate } from "./validation";

const updatePostValidators = [
  body("title").isString().notEmpty().withMessage("Missing update title."),
  body("body").isString().notEmpty().withMessage("Missing update body."),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("Missing update status.")
    .isIn(Object.values(UPDATE_STATUS))
    .withMessage("Invalid update status value."),
  body("version").optional().isString().withMessage("Invalid version value."),
  body("asset").optional().isURL().withMessage("Invalid asset value."),
  body("productId").isString().withMessage("Invalid productId value."),
];

const updatePutValidators = [
  body("title")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Missing update title."),
  body("body").optional().isString().notEmpty().withMessage("Missing body."),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("Missing update status.")
    .isIn(Object.values(UPDATE_STATUS))
    .withMessage("Invalid update status value."),
  body("version").optional().isString().withMessage("Invalid version value."),
  body("asset").optional().isURL().withMessage("Invalid asset value."),
];

export const updatePostValidation = [...updatePostValidators, validate];
export const updatePutValidation = [...updatePutValidators, validate];
