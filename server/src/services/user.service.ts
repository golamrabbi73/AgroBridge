import { prisma } from "../lib/prisma.js";
import { UserRole, UserStatus } from "../generated/client.js";

export const getUsers = async () => {
  return prisma.user.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      products: {
        where: { isDeleted: false },
      },
      bookings: {
        where: { isDeleted: false },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUser = async (
  id: number,
  data: {
    name?: string;
    role?: UserRole;
    status?: UserStatus;
  },
) => {
  const user = await prisma.user.findFirst({
    where: { id, isDeleted: false },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id, isDeleted: false },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};
