import { Router } from "express";
import {
  createNewArticleTag,
  getAllArticleTag,
  getArticleTagById,
  updateArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controllers.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createNewArticleTagValidations, deleteArticleTagByIdValidations, getAllArtcileTagValidations, getArticleTagByIdValidations, updateArticleTagValidations } from "../middlewares/validations/article_tag.validator.js";
import { applyValidations } from "../middlewares/validator.js";

const articleTagRouter = Router();

articleTagRouter.post("/articles-tags", createNewArticleTag);
articleTagRouter.get("/articles-tags", getAllArticleTag);
articleTagRouter.get("/articles-tags/:id", getArticleTagById);
articleTagRouter.put("/articles-tags/:id", authMiddleware, ownerOrAdminMiddleware, updateArticleTagValidations, updateArticleTag);
articleTagRouter.delete("/articles-tags/:id", authMiddleware, ownerOrAdminMiddleware, deleteArticleTagByIdValidations, deleteArticleTag);

export default articleTagRouter;
