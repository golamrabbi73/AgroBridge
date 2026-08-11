import { prisma } from "../lib/prisma.js";

export const createReview = async (data: {
  rating: number;
  comment?: string;
  userId: number;
  productId: number;
}) => {
  const product = await prisma.product.findFirst({
    where: { id: data.productId, isDeleted: false },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const user = await prisma.user.findFirst({
    where: { id: data.userId, isDeleted: false },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.review.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductReviews = async (productId: number) => {
  return prisma.review.findMany({
    where: {
      productId,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReviewById = async (id: number) => {
  const review = await prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};

export const updateReview = async (
  id: number,
  data: {
    rating?: number;
    comment?: string;
  },
) => {
  const review = await prisma.review.findFirst({
    where: { id, isDeleted: false },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return prisma.review.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const deleteReview = async (id: number) => {
  const review = await prisma.review.findFirst({
    where: { id, isDeleted: false },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return prisma.review.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};