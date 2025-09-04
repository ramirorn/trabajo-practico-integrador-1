import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const TagModel = sequelize.define("Tag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    unique: true,
  },
});
