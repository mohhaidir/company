'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Users extends Model { }

  Users.init({
    name: DataTypes.STRING,
    position: DataTypes.STRING
  }, { sequelize });

  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Features, { foreignKey: 'userId' })
  };
  return Users;
};