// Importaciones
import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

// Validaciones de creacion de un nuevo usuario
export const createNewUserValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio")
    .isLength(
      { min: 3, max: 20 }.withMessage(
        "El nombre de usuario debe contener entre 3 a 20 caracteres"
      )
    )
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumerico")
    .custom(async (username) => {
      const user = await UserModel.findOne({ where: { username: username } });
      if (user) {
        throw new Error("El nombre de usuario ya existe");
      }
      return true;
    })
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener el siguiente formato: alguien@gmail.com")
    .isLength({ max: 50 })
    .withMessage("El email no debe pasar los 50 caracteres")
    .custom(async (email) => {
      const email = await UserModel.findOne({ where: { email: email } });
      if (email) {
        throw new Error("El email ya existe");
      }
      return true;
    })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener 8 caracteres como minimo")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(
      "La contraseña debe tener al menos una minuscula, una mayuscula y un número"
    ),
  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin"])
    .withMessage("El role solo puede ser 'user' o 'admin'"),
];

// Validaciones para traer todos los usuarios
export const getAllUsersValidations = [
  param().custom(async () => {
    const users = await UserModel.findAll();
    if (!users) throw new Error("No hay usuarios en la base de datos");
    return true;
  }),
];

// Validaciones para traer un usuario por id
export const getUserByIdValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

// Validaciones para actualizar un usuario
export const updateUserValidations = [
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio")
    .isLength(
      { min: 3, max: 20 }.withMessage(
        "El nombre de usuario debe contener entre 3 a 20 caracteres"
      )
    )
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumerico")
    .custom(async (username) => {
      const user = await UserModel.findOne({ where: { username: username } });
      if (user) {
        throw new Error("El nombre de usuario ya existe");
      }
      return true;
    })
    .escape(),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener el siguiente formato: alguien@gmail.com")
    .isLength({ max: 50 })
    .withMessage("El email no debe pasar los 50 caracteres")
    .custom(async (email) => {
      const email = await UserModel.findOne({ where: { email: email } });
      if (email) {
        throw new Error("El email ya existe");
      }
      return true;
    })
    .escape(),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener 8 caracteres como minimo")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage(
      "La contraseña debe tener al menos una minuscula, una mayuscula y un número"
    ),
  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin"])
    .withMessage("El role solo puede ser 'user' o 'admin'"),
];

// Validaciones para borrar un usuario
export const deleteUserValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];
