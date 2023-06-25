import { RequestHandler } from "express";
import prisma from "../modules/db";

export const getUpdates: RequestHandler = async (req, res) => {
  // Get all updates that user owns
  const products = await prisma.product.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    allUpdates.push(...product.updates);
    return allUpdates;
  }, []);
  res.json({ data: updates });
};

export const getUpdateById: RequestHandler = async (req, res) => {
  const updateId = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id: updateId,
    },
  });

  res.json({ data: { update } });
};

export const createUpdate: RequestHandler = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.body.productId,
        userId: req.user.id,
      },
    },
  });

  if (!product) {
    res.status(400);
    return res.json({ message: "No product found." });
  }

  const createdUpdate = await prisma.update.create({
    data: {
      updatedAt: new Date(),
      ...req.body,
    },
  });

  res.json({ data: { update: createdUpdate } });
};

export const updateUpdate: RequestHandler = async (req, res) => {
  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: { update: updatedUpdate } });
};

export const deleteUpdate: RequestHandler = async (req, res) => {
  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: { update: deletedUpdate } });
};
