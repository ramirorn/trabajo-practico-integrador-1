import { TagModel } from "../models/tag.model.js";

// Creacion de una nueva Tag
export const createNewTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await TagModel.create(name);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer todas las tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer tag por ID
export const getTagById = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una tag
export const updateTag = async (req, res) => {
  try {
    const [updated] = await TagModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated > 0)
      return res
        .status(200)
        .json({ message: "La etiqueta fue actualizada correctamente" });
    return res
      .status(404)
      .json({ message: "La etiqueta no fue encontrada en la base de datos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar una tag
export const deleteTag = async (req, res) => {
  try {
    const deleted = await TagModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "Etiqueta borrada exitosamente" });
    } else {
      res.status(404).json({ message: "Etiqueta no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
