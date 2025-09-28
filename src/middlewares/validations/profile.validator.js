// Importaciones
import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";

// Validaciones para la creacion de un nuevo perfil
export const createNewProfileValidations = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El nombre solo puede contener letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe contener entre 2 a 50 caracteres"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El apellido solo puede contener letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe contener entre 2 a 50 caracteres"),
  body("biography")
    .optional()
    .notEmpty()
    .withMessage("La biografia no puede estar vacia")
    .isLength({ max: 500 })
    .withMessage("La biografia no puede superar los 500 caracteres"),
  body("avatar_url")
    .optional()
    .notEmpty()
    .withMessage("El url no debe estar vacio")
    .isLength({ max: 255 })
    .withMessage("El url no debe superar los 255 caracteres")
    .isURL()
    .withMessage("El url debe tener el formato correcto"),
  body("birth_date")
    .optional()
    .notEmpty()
    .withMessage("Birth_date no debe estar vacio"),
  body("user_id")
    .optional()
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

// Validaciones para traer todos los perfiles
export const getAllProfilesValidations = [
  param().custom(async () => {
    const profiles = await ProfileModel.findAll();
    if (!profiles) throw new Error("No hay perfiles en la base de datos");
    return true;
  }),
];

// Validaciones para traer un perfil por ID
export const getProfileByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("El perfil no existe");
      return true;
    }),
];

// Validaciones para actualizar un perfil
export const updateProfileValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("El perfil no existe");
      return true;
    }),
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El nombre solo puede contener letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe contener entre 2 a 50 caracteres"),
  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/)
    .withMessage("El apellido solo puede contener letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe contener entre 2 a 50 caracteres"),
  body("biography")
    .optional()
    .notEmpty()
    .withMessage("La biografia no puede estar vacia")
    .isLength({ max: 500 })
    .withMessage("La biografia no puede superar los 500 caracteres"),
  body("avatar_url")
    .optional()
    .notEmpty()
    .withMessage("El url no debe estar vacio")
    .isLength({ max: 255 })
    .withMessage("El url no debe superar los 255 caracteres")
    .isURL()
    .withMessage("El url debe tener el formato correcto"),
  body("birth_date")
    .optional()
    .notEmpty()
    .withMessage("Birth_date no debe estar vacio"),
  body("user_id")
    .optional()
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

// Validaciones para borrar un pefil
export const deleteProfilValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("El usuario no existe");
      return true;
    }),
];
