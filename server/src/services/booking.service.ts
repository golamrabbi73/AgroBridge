import { prisma } from "../lib/prisma.js";

export const createBooking = async (data: {
  quantity: number;
  productId: number;
  userId: number;
}) => {
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product || product.isDeleted || product.status !== "AVAILABLE") {
    throw new Error("Product is not available");
  }

  if (product.quantity < data.quantity) {
    throw new Error("Insufficient product quantity");
  }

  const booking = await prisma.$transaction(async (tx) => {
    const createdBooking = await tx.booking.create({
      data: {
        quantity: data.quantity,
        productId: data.productId,
        userId: data.userId,
      },
    });

    await tx.product.update({
      where: { id: data.productId },
      data: {
        quantity: {
          decrement: data.quantity,
        },
      },
    });

    return createdBooking;
  });

  return booking;
};

export const getBookings = async () => {
  return prisma.booking.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};