import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../sequelize";

export interface IAnswerGet {
  id: string;
  user_id: number;
  question_id: string;
  data: any;
}
interface IAnswerCreate {
  id: string;
  user_id: number;
  question_id: string;
  data: any;
}

export const Answer: ModelDefined<IAnswerGet, IAnswerCreate> = sequelize.define(
  "answer",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true, // Можно изменить на false, если user_id обязателен
      references: {
        model: "users", // Ссылка на таблицу users
        key: "telegram_id",
      },
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "questions", // Ссылка на таблицу questions
        key: "id",
      },
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "answers",
    timestamps: false,
  },
);
