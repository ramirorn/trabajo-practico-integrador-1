import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);
userRouter.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, adminMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export default userRouter;
