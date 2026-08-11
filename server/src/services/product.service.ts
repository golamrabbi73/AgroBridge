import { prisma } from "../lib/prisma.js";

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: number;
  userId: number;
}) => {
  return prisma.product.create({
    data,
  });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
  },
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return prisma.product.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};