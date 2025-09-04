import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(50),
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  biography: {
    type: DataTypes.TEXT,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
  },
  birthday: {
    type: DataTypes.DATE,
  },
});
