import { Router } from "express";
import {
  createNewArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import { createNewArticleValidations, deleteArticleValidations, getAllArticlesValidations, getArticleByIdValidations, updateArticleValidations } from "../middlewares/validations/article.validator.js";
import { applyValidations } from "../middlewares/validator.js";

const articleRouter = Router();

articleRouter.post("/articles", authMiddleware, createNewArticleValidations, applyValidations, createNewArticle);
articleRouter.get("/articles", authMiddleware, getAllArticlesValidations, applyValidations, getAllArticles);
articleRouter.get("/articles/:id", authMiddleware, getArticleByIdValidations, applyValidations, getArticleById);
articleRouter.put("/articles/:id", authMiddleware, ownerOrAdminMiddleware, updateArticleValidations, applyValidations, updateArticle);
articleRouter.delete("/articles/:id", authMiddleware, ownerOrAdminMiddleware, deleteArticleValidations, applyValidations, deleteArticle);

export default articleRouter;
