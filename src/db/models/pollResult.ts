import { sequelize } from "../sequelize";
import { DataTypes, ModelDefined } from "sequelize";

export const PollResult: ModelDefined<
  {
    id: string;
    question: string;
    answer: string;
    total_votes: number;
    created_at?: string;
    updated_at?: string;
  },
  {
    question: string;
    total_votes: number;
    answer: string;
  }
> = sequelize.define(
  "pollResult",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "pollResult",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
