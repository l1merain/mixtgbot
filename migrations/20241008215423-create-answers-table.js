"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("answers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true, // Можно изменить на false, если user_id обязателен
        references: {
          model: "users", // Ссылка на таблицу users
          key: "telegram_id",
        },
        onDelete: "CASCADE", // Удаление при удалении пользователя
      },
      question_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "questions", // Ссылка на таблицу questions
          key: "id",
        },
        onDelete: "CASCADE", // Удаление при удалении вопроса
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("answers");
  },
};
