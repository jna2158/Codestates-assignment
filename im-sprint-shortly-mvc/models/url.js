'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  url.init({
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    visits: {
      type: DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'url',
  });
  return url;
};