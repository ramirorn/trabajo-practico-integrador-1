import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";

// Validaciones para crear un nuevo articulo
export const createNewArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El titulo debe tener entre 3 a 200 caracteres"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener 50 caracteres como minimo"),
  body("excerpt")
    .optional()
    .notEmpty()
    .withMessage("El excerpt no debe estar vacio")
    .isLength({ max: 500 })
    .withMessage("El excerpt no debe superar los 500 caracteres"),
  body("status")
    .customSanitizer(async (value) => {
      if (!value || value.trim() === "") return "published";
      return value;
    })
    .isIn(["published", "archived"])
    .withMessage(
      "Status solo debe estar entre los valores 'published' o 'archived'"
    ),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id debe ser incluido")
    .isInt()
    .withMessage("El user_id debe ser un entero")
    .custom(async (user_id) => {
      const user = await UserModel.findByPk(user_id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

// Validaciones para traer todos los articulos
export const getAllArticlesValidations = [
  param().custom(async () => {
    const articles = await ArticleModel.findAll();
    if (!articles) throw new Error("No hay articulos en la base de datos");
    return true;
  }),
];

// Validaciones para traer un articulo por ID
export const getArticleByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const article = await ArticleModel.findByPk(id);
      if (!article) throw new Error("El articulo no existe");
      return true;
    }),
];

// Validaciones para actualizar un articulo
export const updateArticleValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const article = await ArticleModel.findByPk(id);
      if (!article) throw new Error("El articulo no existe");
      return true;
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El titulo debe tener entre 3 a 200 caracteres"),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener 50 caracteres como minimo"),
  body("excerpt")
    .optional()
    .notEmpty()
    .withMessage("El excerpt no debe estar vacio")
    .isLength({ max: 500 })
    .withMessage("El excerpt no debe superar los 500 caracteres"),
  body("status")
    .optional()
    .customSanitizer(async (value) => {
      if (!value || value.trim() === "") return "published";
      return value;
    })
    .isIn(["published", "archived"])
    .withMessage(
      "Status solo debe estar entre los valores 'published' o 'archived'"
    ),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id debe ser incluido")
    .isInt()
    .withMessage("El user_id debe ser un entero")
    .custom(async (user_id) => {
      const user = await UserModel.findByPk(user_id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

// Validaciones para borrar un articulo
export const deleteArticleValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const article = await ArticleModel.findByPk(id);
      if (!article) throw new Error("El articulo no existe");
      return true;
    }),
];
