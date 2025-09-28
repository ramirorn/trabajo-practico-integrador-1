import { ArticleModel } from "../models/article.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  const usuarioLogueado = req.usuarioLogueado;
  try {
    // Busca el articulo por su ID 
    const article = await ArticleModel.findByPk(req.params.id);

    // Si no hay ningun article con ese ID:
    if (!article) return res.status(404).json({message: "El articulo no existe en la BD"})

    // Comprueba si es admin o dueño de ese recurso
    if (usuarioLogueado.role !== "admin" && article.user_id  !== usuarioLogueado.id) {
        return res.status(401).json({message: "No tienes permiso para realizar esta accion"})
    }

    // Continua con la ejecucion 
    next();
  } catch (err) {
    res.status(500).json({message: "Error interno del servidor"})
  }
};
