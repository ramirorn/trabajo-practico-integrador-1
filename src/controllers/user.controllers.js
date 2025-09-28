import { ArticleModel } from "../models/article.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

// Traer todos los usuarios con sus perfiles asociados (solo admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"]},
      include: {
        model: ProfileModel,
        as: "profile"
      }
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Traer un usuario por ID con su perfil y articulos asociados (solo admin)
export const getUserById = async (req, res) => {
  try {
    // Trae un usuario con su perfil y sus articulos
    const user = await UserModel.findByPk(req.params.id, {
      attributes: {exclude: ["password"]}, // Excluye la contraseña
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
        {
          model: ArticleModel,
          as: "articles",
        }
      ]
    });

    // Si no se encuentra un usuario
    if (!user) return res.status(404).json({
      ok: false,
      message: "No se encontro el usuario en la base de datos"
    })
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario (solo admin)
export const updateUser = async (req, res) => {
  try {
    const [updated] = await UserModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated > 0)
      return res
        .status(200)
        .json({ message: "El usuario fue actualizado correctamente" });
    return res
      .status(404)
      .json({ message: "El usuario no fue encontrado en la base de datos" });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor"
    });
  }
};

// Borrar un usuario
export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "Usuario borrado exitosamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
