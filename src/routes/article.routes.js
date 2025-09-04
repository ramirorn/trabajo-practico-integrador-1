import { Router } from "express";
import {
  createNewArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controllers.js";

const articleRouter = Router();

articleRouter.post("/articles", createNewArticle);
articleRouter.get("/articles", getAllArticles);
articleRouter.get("/articles/:id", getArticleById);
articleRouter.put("/articles/:id", updateArticle);
articleRouter.delete("/articles/:id", deleteArticle);

export default articleRouter;
