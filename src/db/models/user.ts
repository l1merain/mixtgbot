import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../sequelize";

export const User: ModelDefined<
  {
    id: string;
    telegram_id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
  },
  {
    id: string;
    telegram_id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
  }
> = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    telegram_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
