import { Router } from "express";
import {
  getAuthProfile,
  login,
  logout,
  register,
  updateAuthProfile,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createNewUserValidations, updateUserValidations } from "../middlewares/validations/user.validator.js";
import { applyValidations } from "../middlewares/validator.js";

export const authRouter = Router();
authRouter.post("/auth/register", createNewUserValidations, applyValidations, register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", authMiddleware, logout);
authRouter.get("/auth/profile", authMiddleware, getAuthProfile);
authRouter.put("/auth/profile", authMiddleware, updateUserValidations, applyValidations, updateAuthProfile);