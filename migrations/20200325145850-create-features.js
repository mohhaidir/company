'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.STRING
      },
      link_to_code: {
        type: Sequelize.STRING
      },
      feature_code: {
        type: Sequelize.STRING
      },
      is_reviewed: {
        type: Sequelize.BOOLEAN
      },
      is_merged: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Features');
  }
};