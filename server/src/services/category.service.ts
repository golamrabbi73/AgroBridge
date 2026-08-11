import { prisma } from "../lib/prisma.js";

export const createCategory = async (data: {
  name: string;
  description?: string;
}) => {
  return prisma.category.create({
    data,
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};