import { ArticleTagModel } from "../models/articleTag.model.js";

// Creacion de una nueva relacion entre articulo tag y model
export const createNewArticleTag = async (req, res) => {
  try {
    const articleTag = await ArticleTagModel.create(req.body);
    res.status(201).json(articleTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer todas las relaciones entre tags y articles
export const getAllArticleTag = async (req, res) => {
  try {
    const articlesTags = await ArticleTagModel.findAll();
    res.status(200).json(articlesTags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer relacion por ID
export const getArticleTagById = async (req, res) => {
  try {
    const articleTag = await ArticleTagModel.findByPk(req.params.id);
    res.status(200).json(articleTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una relacion
export const updateArticleTag = async (req, res) => {
  try {
    const [updated] = await ArticleTagModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated > 0)
      return res
        .status(200)
        .json({ message: "La relacion fue actualizada correctamente" });
    return res
      .status(404)
      .json({ message: "La relacion no fue encontrada en la base de datos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar una relacion
export const deleteArticleTag = async (req, res) => {
  try {
    const deleted = await ArticleTagModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Relacion borrada exitosamente" });
    } else {
      res.status(404).json({ message: "Relacion no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
