import { Router } from "express";
import {
  createNewTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controllers.js";

const tagRouter = Router();

tagRouter.post("/tags", createNewTag);
tagRouter.get("/tags", getAllTags);
tagRouter.get("/tags/:id", getTagById);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleteTag);

export default tagRouter;
