import { UserModel } from "../models/user.model.js";

// Creacion de un nuevo usuario
export const createNewUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await UserModel.create(username, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario
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
    res.status(500).json({ error: err.message });
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
