import { Router } from "express";
import {
  createNewProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controllers.js";

const profileRouter = Router();

profileRouter.post("/profile", createNewProfile);
profileRouter.get("/profile", getAllProfiles);
profileRouter.get("/profile/:id", getProfileById);
profileRouter.put("/profile/:id", updateProfile);
profileRouter.delete("/profile/:id", deleteProfile);

export default profileRouter;
