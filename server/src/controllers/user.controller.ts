import { Request, Response } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await getUserById(id);
    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : "User not found",
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const updatedUser = await updateUser(id, req.body);
    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update user",
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    await deleteUser(id);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete user",
    });
  }
};
