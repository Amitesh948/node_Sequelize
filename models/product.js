'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, { through: models.OrderItem, foreignKey: 'productId' });
    }
  }

  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
