"use strict";

const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      target_position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("questions");
  },
};
