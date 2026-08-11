import { prisma } from "../lib/prisma.js";

export const createReview = async (data: {
  rating: number;
  comment?: string;
  userId: number;
  productId: number;
}) => {
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product || product.isDeleted) {
    throw new Error("Product not found");
  }

  return prisma.review.create({
    data,
  });
};

export const getProductReviews = async (productId: number) => {
  return prisma.review.findMany({
    where: {
      productId,
      isDeleted: false,
    },
    orderBy: {
      id: "desc",
    },
  });
};