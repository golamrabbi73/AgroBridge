import { prisma } from "../lib/prisma.js";
import { BookingStatus } from "../generated/client.js";

export const createBooking = async (data: {
  quantity: number;
  productId: number;
  userId: number;
}) => {
  const product = await prisma.product.findFirst({
    where: { id: data.productId, isDeleted: false },
  });

  if (!product || product.status !== "AVAILABLE") {
    throw new Error("Product is not available");
  }

  if (product.quantity < data.quantity) {
    throw new Error("Insufficient product quantity");
  }

  const user = await prisma.user.findFirst({
    where: { id: data.userId, isDeleted: false },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const booking = await prisma.$transaction(async (tx) => {
    const createdBooking = await tx.booking.create({
      data: {
        quantity: data.quantity,
        productId: data.productId,
        userId: data.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
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
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getBookingById = async (id: number) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

export const updateBooking = async (
  id: number,
  data: {
    quantity?: number;
    status?: BookingStatus;
  },
) => {
  const booking = await prisma.booking.findFirst({
    where: { id, isDeleted: false },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.booking.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });
};

export const deleteBooking = async (id: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id, isDeleted: false },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.booking.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};