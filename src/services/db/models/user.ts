import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../sequelize";

export interface IUserGet {
  telegram_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  is_poll: boolean;
}
interface IUserCreate {
  telegram_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  is_poll?: boolean;
}

export const User: ModelDefined<IUserGet, IUserCreate> = sequelize.define(
  "user",
  {
    telegram_id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
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
    is_poll: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
