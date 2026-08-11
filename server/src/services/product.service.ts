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
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: number) => {
  const product = await prisma.product.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      reviews: {
        where: { isDeleted: false },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    categoryId?: number;
    status?: any;
  },
) => {
  const existingProduct = await prisma.product.findFirst({
    where: { id, isDeleted: false },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

export const deleteProduct = async (id: number) => {
  const existingProduct = await prisma.product.findFirst({
    where: { id, isDeleted: false },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  return prisma.product.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};