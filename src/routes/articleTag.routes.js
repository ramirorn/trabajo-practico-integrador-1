import { Router } from "express";
import {
  createNewArticleTag,
  getAllArticleTag,
  getArticleTagById,
  updateArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controllers.js";

const articleTagRouter = Router();

articleTagRouter.post("/articles-tags", createNewArticleTag);
articleTagRouter.get("/articles-tags", getAllArticleTag);
articleTagRouter.get("/articles-tags/:id", getArticleTagById);
articleTagRouter.put("/articles-tags/:id", updateArticleTag);
articleTagRouter.delete("/articles-tags/:id", deleteArticleTag);

export default articleTagRouter;
