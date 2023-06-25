import { RequestHandler } from "express";
import prisma from "../modules/db";

/**
 * Get all products.
 * @param req
 * @param res
 */
export const getProducts: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

/**
 * Get a product by ID
 * @param req
 * @param res
 */
export const getProductById: RequestHandler = async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      userId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: { product: updated } });
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });

  res.json({ data: { product: deleted } });
};
