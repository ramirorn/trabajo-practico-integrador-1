// Importaciones
import express from "express";
import { startDB } from "./src/config/database.js";
import "dotenv/config";
import userRouter from "./src/routes/user.routes.js";
import tagRouter from "./src/routes/tag.routes.js";
import profileRouter from "./src/routes/profile.routes.js";
import articleTagRouter from "./src/routes/articleTag.routes.js";
import articleRouter from "./src/routes/article.routes.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./src/routes/auth.routes.js";

// Constantes
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRouter);
app.use("/api", tagRouter);
app.use("/api", profileRouter);
app.use("/api", articleTagRouter);
app.use("/api", articleRouter);
app.use("/api", authRouter);
// Conexion a la base de datos
app.listen(PORT, async () => {
  await startDB();
  console.log(`🚀 SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});
