import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
  },
  last_name: {
    type: DataTypes.STRING(50),
  },
  biography: {
    type: DataTypes.TEXT,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
  },
  birth_date: {
    type: DataTypes.DATE,
  },
});
