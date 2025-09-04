import { ProfileModel } from "../models/profile.model.js";

// Creacion de un perfil
export const createNewProfile = async (req, res) => {
  const { firstname, lastname, biography, avatar_url, birthday } = req.body;
  try {
    const profile = await ProfileModel.create(
      firstname,
      lastname,
      biography,
      avatar_url,
      birthday
    );
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer todos los perfiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer perfil por ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await ProfileModel.findByPk(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un perfil
export const updateProfile = async (req, res) => {
  try {
    const [updated] = await ProfileModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated > 0)
      return res
        .status(200)
        .json({ message: "El perfil fue actualizado correctamente" });
    return res
      .status(404)
      .json({ message: "El perfil no fue encontrado en la base de datos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar un perfil
export const deleteProfile = async (req, res) => {
  try {
    const deleted = await ProfileModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Perfil borrado exitosamente" });
    } else {
      res.status(404).json({ message: "Perfil no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
