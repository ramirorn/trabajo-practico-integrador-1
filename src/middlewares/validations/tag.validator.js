// Importaciones
import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

// Validaciones para crear una nueva tag
export const createNewTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre debe ser incluido")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 a 30 caracteres")
    .custom(async (name) => {
      const uniqueName = await TagModel.findOne({ where: { name: name } });
      if (uniqueName) throw new Error("El nombre de la tag ya existe");
    }),
];

// Validaciones para traer todas las tags
export const getAllTagsValidations = [
  param().custom(async () => {
    const tags = await TagModel.findAll();
    if (!tags) throw new Error("No hay tags en la base de datos");
    return true;
  }),
];

// Validaciones para traer una tag por ID
export const getTagByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const tag = await TagModel.findByPk(id);
      if (!tag) throw new Error("La tag no existe");
      return true;
    }),
];

// Validaciones para actualizar una tag
export const updateTagValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const tag = await TagModel.findByPk(id);
      if (!tag) throw new Error("La tag no existe");
      return true;
    }),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre debe ser incluido")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 a 30 caracteres")
    .custom(async (name) => {
      const uniqueName = await TagModel.findOne({ where: { name: name } });
      if (uniqueName) throw new Error("El nombre de la tag ya existe");
    }),
];

// Validaciones para borrar una tag
export const deleteTagValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const tag = await TagModel.findByPk(id);
      if (!tag) throw new Error("La tag no existe");
      return true;
    }),
];
