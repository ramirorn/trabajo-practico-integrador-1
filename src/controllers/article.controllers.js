import { ArticleModel } from "../models/article.model.js";

// Creacion de un nuevo articulo
export const createNewArticle = async (req, res) => {
  const { title, content, excerpt, status } = req.body;
  try {
    const article = await ArticleModel.create(title, content, excerpt, status);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer todos los articulos
export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer articulo por ID
export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un articulo
export const updateArticle = async (req, res) => {
  try {
    const [updated] = await ArticleModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated > 0)
      return res
        .status(200)
        .json({ message: "El articulo fue actualizado correctamente" });
    return res
      .status(404)
      .json({ message: "El articulo no fue encontrado en la base de datos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar un Articulo
export const deleteArticle = async (req, res) => {
  try {
    const deleted = await ArticleModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Articulo borrado exitosamente" });
    } else {
      res.status(404).json({ message: "Articulo no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
