// Importaciones
import express from "express";
import { startDB } from "./src/config/database.js";
import "dotenv/config";
import userRouter from "./src/routes/user.routes.js";
import tagRouter from "./src/routes/tag.routes.js";
import profileRouter from "./src/routes/profile.routes.js";
import articleTagRouter from "./src/routes/articleTag.routes.js";
import articleRouter from "./src/routes/article.routes.js";

// Constantes
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", tagRouter);
app.use("/api", profileRouter);
app.use("/api", articleTagRouter);
app.use("/api", articleRouter);

// Conexion a la base de datos
app.listen(PORT, async () => {
  await startDB();
  console.log(`🚀 SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});
