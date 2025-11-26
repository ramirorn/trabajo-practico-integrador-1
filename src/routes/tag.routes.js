import { Router } from "express";
import {
  createNewTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controllers.js";
import { createNewTagValidations, deleteTagValidations, getAllTagsValidations, getTagByIdValidations, updateTagValidations } from "../middlewares/validations/tag.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { applyValidations } from "../middlewares/validator.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const tagRouter = Router();

tagRouter.post("/tags", authMiddleware, adminMiddleware, createNewTagValidations, applyValidations, createNewTag);
tagRouter.get("/tags", authMiddleware, getAllTagsValidations, applyValidations, getAllTags);
tagRouter.get("/tags/:id",authMiddleware,adminMiddleware,getTagByIdValidations, applyValidations, getTagById);
tagRouter.put("/tags/:id", authMiddleware, adminMiddleware, updateTagValidations, applyValidations, updateTag);
tagRouter.delete("/tags/:id", authMiddleware, adminMiddleware, deleteTagValidations, applyValidations, deleteTag);

export default tagRouter;
