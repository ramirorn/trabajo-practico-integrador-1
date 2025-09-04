// Importaciones
import express from "express";
import { startDB } from "./src/config/database.js";
import "dotenv/config";

// Constantes
const app = express();
const PORT = process.env.PORT;

// Conexion a la base de datos
app.listen(PORT, async () => {
  await startDB();
  console.log(`🚀 SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});
