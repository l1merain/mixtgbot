import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../sequelize";

export interface IQuestionGet {
  id: string;
  data: any;
  target_position: number;
  text: string;
  is_active: boolean;
}
interface IQuestionCreate {
  id: string;
  data: any;
  target_position: number;
  text: string;
  is_active?: boolean;
}

export const Question: ModelDefined<IQuestionGet, IQuestionCreate> =
  sequelize.define(
    "question",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      target_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "questions",
      timestamps: false,
    },
  );
