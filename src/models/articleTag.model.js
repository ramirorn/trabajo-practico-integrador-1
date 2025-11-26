import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TagModel } from "./tag.model.js";
import { ArticleModel } from "./article.model.js";

export const ArticleTagModel = sequelize.define("ArticleTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// Relacion muchos a muchos
TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  onDelete: "CASCADE",
});

ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  onDelete: "CASCADE",
});