"use strict";

const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      telegram_id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        primaryKey: true,
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        required: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        required: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
