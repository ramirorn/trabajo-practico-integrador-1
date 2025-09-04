// Importaciones
import { Sequelize } from "sequelize";
import "dotenv/config";

// Instanciación de Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Inicialización de la base de datos
export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión con la base de datos establecida correctamente.");
    await sequelize.sync();
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
};
