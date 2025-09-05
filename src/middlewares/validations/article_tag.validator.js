// Importaciones
import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";
import { ArticleTagModel } from "../../models/articleTag.model.js";

// Validaciones para crear una nueva relacion entre Tag y Article
export const createNewArticleTagValidations = [
  body("article_id")
    .notEmpty()
    .withMessage("El article_id debe ser incluido")
    .isInt()
    .withMessage("El article_id debe ser un entero")
    .custom(async (article_id) => {
      const article = await ArticleModel.findByPk(article_id);
      if (!article) throw new Error("El usuario no existe");
      return true;
    })
    .custom(async (article_id, { req }) => {
      const tag_id = req.tag_id;
      const exist = await ArticleTagModel.findOne({
        where: { article_id, tag_id },
      });
      if (exist) throw new Error("La relacion ya existe");
      return true;
    }),
  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id debe ser incluido")
    .isInt()
    .withMessage("El tag_id debe ser un entero")
    .custom(async (tag_id) => {
      const tag = await TagModel.findByPk(tag_id);
      if (!tag) throw new Error("El tag no existe");
      return true;
    }),
];

//Validaciones para traer todas las relaciones
export const getAllArtcileTagValidations = [
  param().custom(async () => {
    const articleTag = await ArticleTagModel.findAll();
    if (!articleTag) throw new Error("No hay relaciones en la base de datos");
    return true;
  }),
];

// Validaciones para traer una relacion por ID
export const getArticleTagByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const articleTag = await ArticleTagModel.findByPk(id);
      if (!articleTag) throw new Error("La relacion no existe");
      return true;
    }),
];

// Validaciones para actualizar una relacion
export const updateArticleTagValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const articleTag = await ArticleTagModel.findByPk(id);
      if (!articleTag) throw new Error("La relacion no existe");
      return true;
    }),
  body("article_id")
    .optional()
    .notEmpty()
    .withMessage("El article_id debe ser incluido")
    .isInt()
    .withMessage("El article_id debe ser un entero")
    .custom(async (article_id) => {
      const article = await ArticleModel.findByPk(article_id);
      if (!article) throw new Error("El usuario no existe");
      return true;
    })
    .custom(async (article_id, { req }) => {
      const tag_id = req.tag_id;
      const exist = await ArticleTagModel.findOne({
        where: { article_id, tag_id },
      });
      if (exist) throw new Error("La relacion ya existe");
      return true;
    }),
  body("tag_id")
    .optional()
    .notEmpty()
    .withMessage("El tag_id debe ser incluido")
    .isInt()
    .withMessage("El tag_id debe ser un entero")
    .custom(async (tag_id) => {
      const tag = await TagModel.findByPk(tag_id);
      if (!tag) throw new Error("El tag no existe");
      return true;
    }),
];

// Validaciones para borrar una relacion
export const deleteArticleTagByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const articleTag = await ArticleTagModel.findByPk(id);
      if (!articleTag) throw new Error("La relacion no existe");
      return true;
    }),
];
