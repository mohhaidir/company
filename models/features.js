'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Features extends Model { }

  Features.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isNameEmpty: (value) => {
          if (value.length == 0) {
            throw new Error('Name field cannot be empty!')
          }
        }
      }
    },
    scope: {
      type: DataTypes.STRING,
      validate: (value2) => {
        if (value2 == 'null') {
          throw new Error('Scope field cannot be empty')
        }
      }
    },
    link_to_code: DataTypes.STRING,
    feature_code: DataTypes.STRING,
    is_reviewed: DataTypes.BOOLEAN,
    is_merged: DataTypes.BOOLEAN,
    userId: DataTypes.STRING
  }, {
    hooks: {
      afterValidate: (instance) => {
        let codes = instance.name.split(' ').join('_')
        instance.feature_code = `${instance.scope}_${codes}`
      }
    }, sequelize
  });

  Features.associate = function (models) {
    // associations can be defined here
    Features.belongsTo(models.Users, { foreignKey: 'userId' })
  };
  return Features;
};