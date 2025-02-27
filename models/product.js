'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
  });

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.OrderItem, foreignKey: 'productId' });
  };

  return Product;
};