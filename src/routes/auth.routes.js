import { Router } from "express";
import {
  getAuthProfile,
  login,
  logout,
  register,
  updateAuthProfile,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();
authRouter.post("/auht/register", register);
authRouter.post("/auht/login", login);
authRouter.post("/auht/logout", logout);
authRouter.get("/auht/profile", authMiddleware, getAuthProfile);
authRouter.put("/auht/profile", authMiddleware, updateAuthProfile);
