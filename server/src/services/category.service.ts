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

export const getCategoryById = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      products: {
        where: { isDeleted: false },
      },
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (
  id: number,
  data: {
    name?: string;
    description?: string;
  },
) => {
  const category = await prisma.category.findFirst({
    where: { id, isDeleted: false },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: { id, isDeleted: false },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};